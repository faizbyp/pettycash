"use client";

import useFetch from "@/hooks/useFetch";
import useSessionStorage from "@/hooks/useSessionStorage";
import DatePickerCtrl from "@/components/forms/DatePicker";
import SelectCtrl from "@/components/forms/Select";
import { Box, Button, Grid2 as Grid, MenuItem, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function NewPOPage() {
  const router = useRouter();
  const [poData, setPoData] = useSessionStorage("poData");
  const { data: companies } = useFetch("/company");
  const { data: vendors } = useFetch("/vendor");

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      company: "",
      po_date: moment(),
      vendor: "",
    },
  });

  const onNext = () => {
    setPoData(getValues());
    router.push("/dashboard/my-po/new-2");
  };

  return (
    <Box component="main">
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Create New PO
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          {companies && vendors ? (
            <form>
              <Box sx={{ mb: 2 }}>
                <SelectCtrl
                  name="company"
                  label="Company"
                  control={control}
                  rules={{
                    required: "Field required",
                  }}
                >
                  {companies.data.map((data) => (
                    <MenuItem key={data.id_company} value={data.id_company}>
                      {data.company_name}
                    </MenuItem>
                  ))}
                </SelectCtrl>
              </Box>
              <Box sx={{ mb: 2 }}>
                <DatePickerCtrl
                  name="po_date"
                  label="PO Date"
                  control={control}
                  rules={{
                    required: "Field required",
                  }}
                  onChange={(value) => {
                    setValue("po_date", value);
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <SelectCtrl
                  name="vendor"
                  label="Vendor"
                  control={control}
                  rules={{ required: "Field required" }}
                >
                  {vendors.data.map((data) => (
                    <MenuItem key={data.id_vendor} value={data.id_vendor}>
                      {data.vendor_name}
                    </MenuItem>
                  ))}
                </SelectCtrl>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Button variant="contained" onClick={handleSubmit(onNext)}>
                  Next
                </Button>
              </Box>
            </form>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Skeleton variant="rounded" width="100%" height={64} />
              <Skeleton variant="rounded" width="100%" height={64} />
              <Skeleton variant="rounded" width="100%" height={64} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
export default NewPOPage;

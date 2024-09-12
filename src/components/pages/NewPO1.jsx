"use client";

import useFetch from "@/hooks/useFetch";
import useSessionStorage from "@/hooks/useSessionStorage";
import DatePickerCtrl from "@/components/forms/DatePicker";
import SelectCtrl from "@/components/forms/Select";
import { Box, Button, Grid2 as Grid, MenuItem, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ListSkeleton } from "../Skeleton";

const NewPO1 = () => {
  const router = useRouter();
  const [poData, setPoData] = useSessionStorage("poData");
  const { data: companies } = useFetch("/company");
  const { data: vendors } = useFetch("/vendor");

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      company: "",
      sub_company: "",
      po_date: moment(),
      vendor: "",
    },
  });

  const onNext = (values) => {
    console.log(values);
    if (values.sub_company)
      values = {
        ...values,
        company: values.sub_company,
      };
    delete values.sub_company;
    console.log(values);
    setPoData(values);
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
            <Box component="form" onSubmit={handleSubmit(onNext)} sx={{ width: "100%" }}>
              <SelectCtrl
                name="company"
                label="Company"
                control={control}
                rules={{
                  required: "Field required",
                }}
              >
                {companies.data
                  .filter((data) => data.company_type === "group")
                  .map((data) => (
                    <MenuItem key={data.id_company} value={data.id_company}>
                      {data.company_name}
                    </MenuItem>
                  ))}
              </SelectCtrl>
              {watch("company") === "DW" && (
                <SelectCtrl
                  name="sub_company"
                  label="Sub Company"
                  control={control}
                  rules={{
                    required: "Field required",
                  }}
                >
                  {companies.data
                    .filter((data) => data.company_type === "sub")
                    .map((data) => (
                      <MenuItem key={data.id_company} value={data.id_company}>
                        {data.company_name}
                      </MenuItem>
                    ))}
                </SelectCtrl>
              )}

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
              <Box sx={{ textAlign: "right" }}>
                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Box>
            </Box>
          ) : (
            <ListSkeleton />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default NewPO1;

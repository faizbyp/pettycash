"use client";

import useFetch from "@/app/hooks/useFetch";
import useSessionStorage from "@/app/hooks/useSessionStorage";
import DatePickerCtrl from "@/components/forms/DatePicker";
import SelectCtrl from "@/components/forms/Select";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function NewPO2Page() {
  const router = useRouter();
  const [poData, setPoData] = useSessionStorage("poData");
  const { data: company } = useFetch(poData ? `/company/${poData.company}` : null);
  const { data: vendor } = useFetch(poData ? `/vendor/${poData.vendor}` : null);
  console.log(poData);

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      company: "",
      po_date: moment(),
      vendor: "",
    },
  });

  const onPrev = () => {
    router.back();
  };

  const onSubmit = async (values) => {
    // setLoading(true);
    const payload = {
      company: values.company,
      po_date: values.po_date.toString(),
      vendor: values.vendor,
    };
    console.log(payload);
    // try {
    //   const res = !isEdit
    //     ? await axiosAuth.post("/book", { data: payload })
    //     : await axiosAuth.patch(`/book/${editData.id_book}`, { data: payload });
    //   router.replace(`/dashboard/book/success/${res.data.id_ticket}`);
    // } catch (error) {
    //   const errors = error as AxiosError;
    //   if (axios.isAxiosError(error)) {
    //     const data = errors.response?.data as { message: string };
    //     toast.error(data.message);
    //   } else {
    //     toast.error("error");
    //   }
    //   console.error(error);
    //   setLoading(false);
    // }
  };

  return (
    <Box component="main">
      <Button onClick={() => onPrev()}>Back</Button>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Create New PO - 2
      </Typography>
      {company && vendor && poData ? (
        <>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>{company.data.name}</Typography>
              <Typography>{company.data.addr}</Typography>
              <Typography>Phone: {company.data.phone}</Typography>
              <Typography>Fax: {company.data.fax}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Date</Typography>
              <Typography>{moment(poData.po_date).format("DD/MM/YYYY")}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography>Vendor: {vendor.data.vendor_name}</Typography>
          <form>
            <Box sx={{ textAlign: "right" }}>
              <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Box>
          </form>
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rounded" width="100%" height={64} />
          <Skeleton variant="rounded" width="100%" height={64} />
          <Skeleton variant="rounded" width="100%" height={64} />
        </Box>
      )}
    </Box>
  );
}
export default NewPO2Page;

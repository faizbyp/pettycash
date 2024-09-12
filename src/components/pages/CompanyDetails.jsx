"use client";

import CheckboxCtrl from "@/components/forms/Checkbox";
import TextFieldCtrl from "@/components/forms/TextField";
import useFetch from "@/hooks/useFetch";
import API from "@/services/api";
import { Box, Skeleton, Typography, Grid2 as Grid, Button } from "@mui/material";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import NumericFieldCtrl from "../forms/NumericField";
import { ListSkeleton } from "../Skeleton";

const CompanyDetails = ({ idCompany }) => {
  const { data: company } = useFetch(`/company/${idCompany}`);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      company_name: "",
      company_addr: "",
      company_phone: "",
      company_fax: "",
    },
  });

  useEffect(() => {
    if (company)
      reset({
        company_name: company.data.company_name,
        company_addr: company.data.company_addr,
        company_phone: company.data.company_phone,
        company_fax: company.data.company_fax,
      });
  }, [company, reset]);

  const onEdit = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      const res = await API.patch(`/company/${idCompany}`, values);
      toast.success(`${res.data.message}`);
      router.push("/admin/company");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        toast.error(data.message);
      } else {
        toast.error("Error");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        {company ? (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography>{company.data.id_company}</Typography>
              <Typography variant="h1" sx={{ color: "primary.main" }}>
                {company.data.company_name}
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onEdit)} sx={{ width: "100%" }}>
                <Typography variant="h2">Edit Company</Typography>
                <TextFieldCtrl
                  name="company_name"
                  control={control}
                  label="Company Name"
                  rules={{
                    required: "Field required",
                  }}
                />
                <TextFieldCtrl
                  name="company_addr"
                  control={control}
                  label="Address"
                  multiline
                  rules={{
                    required: "Field required",
                  }}
                />
                <NumericFieldCtrl
                  name="company_phone"
                  control={control}
                  label="Phone"
                  rules={{
                    required: "Field required",
                  }}
                />
                <NumericFieldCtrl
                  name="company_fax"
                  control={control}
                  label="Fax"
                  rules={{
                    required: "Field required",
                  }}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Button type="submit" variant="contained" disabled={!isDirty || loading}>
                    Edit
                  </Button>
                </Box>
              </Box>
            </Box>
            {/* <Typography variant="h2" sx={{ color: "error.main" }}>
              Delete company
            </Typography>
            <Button variant="contained" color="error" disabled={loading}>
              Delete
            </Button> */}
          </>
        ) : (
          <ListSkeleton />
        )}
      </Grid>
    </Grid>
  );
};
export default CompanyDetails;

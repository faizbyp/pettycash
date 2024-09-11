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

function VendorDetailPage({ params }) {
  const { data: vendor } = useFetch(`/vendor/${params.idVendor}`);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      vendor_name: "",
      vendor_addr: "",
      is_active: false,
    },
  });

  useEffect(() => {
    if (vendor)
      reset({
        vendor_name: vendor.data.vendor_name,
        vendor_addr: vendor.data.vendor_addr,
        is_active: vendor.data.is_active,
      });
  }, [vendor, reset]);

  const onEdit = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      const res = await API.patch(`/vendor/${params.idVendor}`, values);
      toast.success(`${res.data.message}`);
      router.push("/admin/vendor");
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
        {vendor ? (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h1" sx={{ color: "primary.main" }}>
                {vendor.data.vendor_name}
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onEdit)} sx={{ width: "100%" }}>
                <Typography variant="h2">Edit Vendor</Typography>
                <TextFieldCtrl
                  name="vendor_name"
                  control={control}
                  label="Vendor Name"
                  rules={{
                    required: "Field required",
                  }}
                />
                <TextFieldCtrl
                  name="vendor_addr"
                  control={control}
                  label="Address"
                  rules={{
                    required: "Field required",
                  }}
                />
                <CheckboxCtrl name="is_active" control={control} label="Active" noMargin />
                <Box sx={{ textAlign: "right" }}>
                  <Button type="submit" variant="contained" disabled={!isDirty || loading}>
                    Edit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Typography variant="h2" sx={{ color: "error.main" }}>
              Delete Vendor
            </Typography>
            <Button variant="contained" color="error" disabled={loading}>
              Delete
            </Button>
          </>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Skeleton variant="rounded" width="100%" height={64} />
            <Skeleton variant="rounded" width="100%" height={64} />
            <Skeleton variant="rounded" width="100%" height={64} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
export default VendorDetailPage;

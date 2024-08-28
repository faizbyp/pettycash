"use client";

import useFetch from "@/app/hooks/useFetch";
import SelectCtrl from "@/components/forms/SelectCtrl";
import TextFieldCtrl from "@/components/forms/TextFieldCtrl";
import { Box, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function RequestPage() {
  const { data: vendor } = useFetch("/vendor");
  const { data: item } = useFetch("/item");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      vendor: "",
    },
  });

  return (
    <Box component="main">
      {vendor && (
        <SelectCtrl name="vendor" label="Vendor" control={control}>
          {vendor.data.map((data) => (
            <MenuItem key={data.id_vendor} value={data.id_vendor}>
              {data.vendor_name}
            </MenuItem>
          ))}
        </SelectCtrl>
      )}
    </Box>
  );
}
export default RequestPage;

"use client";

import useFetch from "@/hooks/useFetch";
import SelectCtrl from "@/components/forms/SelectCtrl";
import TextFieldCtrl from "@/components/forms/TextFieldCtrl";
import { Box, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function NewPOPage() {
  const { data: company } = useFetch("/company");
  const { data: vendor } = useFetch("/vendor");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      company: "",
      vendor: "",
    },
  });

  return (
    <Box component="main">
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        My Purchase Orders
      </Typography>
    </Box>
  );
}
export default NewPOPage;

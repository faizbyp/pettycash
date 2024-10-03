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
import ComparisonTable from "../ComparisonTable";

const Reports = () => {
  const { data: comparison } = useFetch("/report/comparison");

  return (
    <>
      <Typography variant="h1">Reports</Typography>
      {comparison && <ComparisonTable data={comparison.data} />}
    </>
  );
};
export default Reports;

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
import useAPI from "@/hooks/useAPI";
import DownloadIcon from "@mui/icons-material/Download";
import { TableSkeleton } from "../Skeleton";

const Reports = () => {
  const API = useAPI();
  const { data: comparison } = useFetch("/report/comparison");
  const [loading, setLoading] = useState(false);

  const downloadExcel = async () => {
    try {
      setLoading(true);
      const response = await API.get("/report/comparison/xlsx", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "pettycash-comparison-report.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography variant="h1" sx={{ m: 0 }}>
          Reports
        </Typography>
        {comparison && (
          <Button
            onClick={downloadExcel}
            variant="contained"
            startIcon={<DownloadIcon />}
            disabled={loading}
          >
            Download
          </Button>
        )}
      </Box>
      {comparison ? <ComparisonTable data={comparison.data} /> : <TableSkeleton column={8} />}
    </>
  );
};
export default Reports;

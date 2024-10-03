"use client";

import useFetch from "@/hooks/useFetch";
import {
  Box,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import ComparisonTable from "../ComparisonTable";
import useAPI from "@/hooks/useAPI";
import DownloadIcon from "@mui/icons-material/Download";
import { TableSkeleton } from "../Skeleton";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import BackspaceIcon from "@mui/icons-material/Backspace";

const Reports = () => {
  const API = useAPI();
  const [loading, setLoading] = useState(false);
  const [grDate, setGrDate] = useState("");
  const [poDate, setPoDate] = useState("");
  const [company, setCompany] = useState("");
  const { data: comparison } = useFetch(
    `/report/comparison?gr_date=${grDate}&po_date=${poDate}&company=${company}`
  );

  const downloadExcel = async () => {
    try {
      setLoading(true);
      const response = await API.get(
        `/report/comparison/xlsx?gr_date=${grDate}&po_date=${poDate}&company=${company}`,
        {
          responseType: "blob",
        }
      );
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

  const filterPoDate = (value) => {
    setPoDate(moment(value).format("YYYY-MM-DD"));
  };

  const filterGrDate = (value) => {
    setGrDate(moment(value).format("YYYY-MM-DD"));
  };

  const filterCompany = (e) => {
    const comp = e.target.value;
    setCompany(comp);
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
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}>
          <DatePicker
            onChange={filterPoDate}
            sx={{ width: "100%" }}
            value={poDate ? moment(poDate) : null}
            label="Plan Date"
            format="DD/MM/YYYY"
          />
          <IconButton
            aria-label="clear"
            onClick={() => {
              setPoDate("");
            }}
          >
            <BackspaceIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}>
          <DatePicker
            onChange={filterGrDate}
            sx={{ width: "100%" }}
            value={grDate ? moment(grDate) : null}
            label="Confirmation Date"
            format="DD/MM/YYYY"
          />
          <IconButton
            aria-label="clear"
            onClick={() => {
              setGrDate("");
            }}
          >
            <BackspaceIcon />
          </IconButton>
        </Box>
        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select value={company} label="Company" onChange={filterCompany}>
            <MenuItem value="">---</MenuItem>
            <MenuItem value="CG">Cemindo</MenuItem>
            <MenuItem value="UP">Upstream</MenuItem>
            <MenuItem value="DW">Downstream</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {comparison ? <ComparisonTable data={comparison.data} /> : <TableSkeleton column={8} />}
    </>
  );
};
export default Reports;

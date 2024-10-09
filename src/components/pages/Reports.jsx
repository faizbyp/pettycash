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

const compArray = [
  {
    name: "---",
    value: "",
  },
  {
    value: "CG",
    name: "Cemindo",
  },
  {
    value: "UP",
    name: "Upstream",
  },
  {
    value: "DW",
    name: "Downstream",
  },
];

const Reports = () => {
  const API = useAPI();
  const [loading, setLoading] = useState(false);
  const [grStartDate, setGrStartDate] = useState("");
  const [grEndDate, setGrEndDate] = useState("");
  const [poStartDate, setPoStartDate] = useState("");
  const [poEndDate, setPoEndDate] = useState("");
  const [company, setCompany] = useState("");
  const { data: comparison } = useFetch(
    `/report/comparison?gr_start_date=${grStartDate}&gr_end_date=${grEndDate}&po_start_date=${poStartDate}&po_end_date=${poEndDate}&company=${company}`
  );

  const downloadExcel = async () => {
    try {
      setLoading(true);
      const response = await API.get(
        `/report/comparison/xlsx?gr_start_date=${grStartDate}&gr_end_date=${grEndDate}&po_start_date=${poStartDate}&po_end_date=${poEndDate}&company=${company}`,
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

  const filterPoStartDate = (value) => {
    setPoStartDate(moment(value).format("YYYY-MM-DD"));
  };
  const filterPoEndDate = (value) => {
    setPoEndDate(moment(value).format("YYYY-MM-DD"));
  };

  const filterGrStartDate = (value) => {
    setGrStartDate(moment(value).format("YYYY-MM-DD"));
  };
  const filterGrEndDate = (value) => {
    setGrEndDate(moment(value).format("YYYY-MM-DD"));
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
            onChange={filterPoStartDate}
            sx={{ width: "100%" }}
            value={poStartDate ? moment(poStartDate) : null}
            label="Plan Start Date"
            format="DD/MM/YYYY"
          />
          <DatePicker
            onChange={filterPoEndDate}
            sx={{ width: "100%" }}
            value={poEndDate ? moment(poEndDate) : null}
            label="Plan End Date"
            format="DD/MM/YYYY"
          />
          <IconButton
            aria-label="clear"
            onClick={() => {
              setPoStartDate("");
              setPoEndDate("");
            }}
          >
            <BackspaceIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}>
          <DatePicker
            onChange={filterGrStartDate}
            sx={{ width: "100%" }}
            value={grStartDate ? moment(grStartDate) : null}
            label="Conf. Start Date"
            format="DD/MM/YYYY"
          />
          <DatePicker
            onChange={filterGrEndDate}
            sx={{ width: "100%" }}
            value={grEndDate ? moment(grEndDate) : null}
            label="Conf. End Date"
            format="DD/MM/YYYY"
          />
          <IconButton
            aria-label="clear"
            onClick={() => {
              setGrStartDate("");
              setGrEndDate("");
            }}
          >
            <BackspaceIcon />
          </IconButton>
        </Box>
        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select value={company} label="Company" onChange={filterCompany}>
            {compArray.map((comp, index) => (
              <MenuItem key={index} value={comp.value}>
                {comp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {comparison ? <ComparisonTable data={comparison.data} /> : <TableSkeleton column={8} />}
    </>
  );
};
export default Reports;

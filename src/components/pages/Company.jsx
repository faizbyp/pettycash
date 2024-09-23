"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
  Paper,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useForm } from "react-hook-form";
import DialogComp from "@/components/Dialog";
import { useState } from "react";
import TextFieldCtrl from "@/components/forms/TextField";
import CheckboxCtrl from "@/components/forms/Checkbox";
import API from "@/services/api";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import NumericFieldCtrl from "@/components/forms/NumericField";
import { TableSkeleton } from "../Skeleton";
import { getValueToPositionMapper } from "@mui/x-charts";

const Company = () => {
  const { data: companies } = useFetch("/company?type=group");
  const { data: DWCompanies, refetch: DWRefetch } = useFetch("/company?type=sub&group=DW");
  const { data: UPCompanies, refetch: UPRefetch } = useFetch("/company?type=sub&group=UP");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: {
      company_name: "",
      company_addr: "",
      company_phone: "",
      company_fax: "",
      company_type: "sub",
      company_group: "",
    },
  });

  const handleOpenDWForm = () => {
    setValue("company_group", "DW");
    setOpenForm(true);
  };

  const handleOpenUPForm = () => {
    setValue("company_group", "UP");
    setOpenForm(true);
  };

  const handleCloseForm = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    reset();
    setOpenForm(false);
  };

  const addCompany = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      const res = await API.post("/company", getValues());
      toast.success(`${res.data.message}:
        ${res.data.data}`);
      DWRefetch();
      UPRefetch();
      handleCloseForm();
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
    <>
      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Companies
        </Typography>
        {companies ? (
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="PO Table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Fax</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.data.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id_company}
                    </TableCell>
                    <TableCell>{row.company_name}</TableCell>
                    <TableCell>{row.company_addr}</TableCell>
                    <TableCell>{row.company_phone}</TableCell>
                    <TableCell>{row.company_fax}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableSkeleton column={5} />
        )}
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Box sx={{ mb: 1, display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="h2" sx={{ m: 0, color: "primary.main" }}>
            Downstream Companies
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenDWForm}>
            Add DW Company
          </Button>
        </Box>
        {DWCompanies ? (
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="PO Table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Fax</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DWCompanies.data.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id_company}
                    </TableCell>
                    <TableCell>{row.company_name}</TableCell>
                    <TableCell>{row.company_addr}</TableCell>
                    <TableCell>{row.company_phone}</TableCell>
                    <TableCell>{row.company_fax}</TableCell>
                    <TableCell align="right">
                      <Link href={`/admin/company/${row.id_company}`} passHref>
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableSkeleton column={6} />
        )}
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Box sx={{ mb: 1, display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="h2" sx={{ m: 0, color: "primary.main" }}>
            Upstream Companies
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenUPForm}>
            Add UP Company
          </Button>
        </Box>
        {UPCompanies ? (
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="PO Table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Fax</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {UPCompanies.data.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id_company}
                    </TableCell>
                    <TableCell>{row.company_name}</TableCell>
                    <TableCell>{row.company_addr}</TableCell>
                    <TableCell>{row.company_phone}</TableCell>
                    <TableCell>{row.company_fax}</TableCell>
                    <TableCell align="right">
                      <Link href={`/admin/company/${row.id_company}`} passHref>
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableSkeleton column={6} />
        )}
      </Box>

      <DialogComp
        title={`Add Company (${getValues("company_group")})`}
        open={openForm}
        onClose={handleCloseForm}
        actions={
          <>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit(addCompany)} disabled={loading}>
              Add
            </Button>
          </>
        }
      >
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
      </DialogComp>
    </>
  );
};
export default Company;

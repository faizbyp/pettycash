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
  Chip,
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
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { TableSkeleton } from "../../Skeleton";
import useAPI from "@/hooks/useAPI";

const Vendor = () => {
  const API = useAPI();
  const { data: vendors, refetch } = useFetch("/vendor");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      vendor_name: "",
      vendor_addr: "",
      is_active: true,
    },
  });

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    reset();
    setOpenForm(false);
  };

  const addVendor = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      const res = await API.post("/vendor", values);
      toast.success(`${res.data.message}:
        ${res.data.data}`);
      refetch();
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
      <Box sx={{ mb: 1, display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="h1" sx={{ m: 0, color: "primary.main" }}>
          Vendors
        </Typography>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenForm}>
          Add Vendor
        </Button>
      </Box>
      {vendors ? (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "92vw", overflow: "scroll", maxHeight: 440 }}
        >
          <Table stickyHeader aria-label="PO Table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "white",
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.data.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id_vendor}
                  </TableCell>
                  <TableCell>{row.vendor_name}</TableCell>
                  <TableCell>{row.vendor_addr}</TableCell>
                  <TableCell>
                    <Chip
                      color={row.is_active === true ? "success" : "error"}
                      label={row.is_active === true ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/dashboard/vendor/${row.id_vendor}`} passHref>
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
        <TableSkeleton column={5} />
      )}

      <DialogComp
        title="Add Vendor"
        open={openForm}
        onClose={handleCloseForm}
        actions={
          <>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit(addVendor)} disabled={loading}>
              Add
            </Button>
          </>
        }
      >
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
          multiline
          rules={{
            required: "Field required",
          }}
        />
        <CheckboxCtrl name="is_active" control={control} label="Active" noMargin />
      </DialogComp>
    </>
  );
};
export default Vendor;

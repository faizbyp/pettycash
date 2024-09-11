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
  List,
  ListItem,
  ListItemText,
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

function VendorPage() {
  const { data: uom, refetch } = useFetch("/uom");
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
          Unit of Measurements
        </Typography>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenForm}>
          Add UOM
        </Button>
      </Box>
      {uom ? (
        <List sx={{ listStyle: "decimal", pl: 4 }}>
          {uom.data.map((row) => (
            <ListItem sx={{ display: "list-item" }} key={row.id}>
              <ListItemText primary={row.uom} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Skeleton variant="rounded" width="100%" height={64} />
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
          rules={{
            required: "Field required",
          }}
        />
        <CheckboxCtrl name="is_active" control={control} label="Active" noMargin />
      </DialogComp>
    </>
  );
}
export default VendorPage;

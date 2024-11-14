"use client";

import { Typography, Box, Button, List, ListItem, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useFetch from "@/hooks/useFetch";
import { useForm } from "react-hook-form";
import DialogComp from "@/components/Dialog";
import { useState } from "react";
import TextFieldCtrl from "@/components/forms/TextField";
import CheckboxCtrl from "@/components/forms/Checkbox";
import API from "@/services/api";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { ListSkeleton } from "../../Skeleton";

const UOM = () => {
  const { data: uom, refetch } = useFetch("/uom");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      uom: "",
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

  const addUOM = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      const res = await API.post("/uom", values);
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
        <Box sx={{ width: "40%" }}>
          <ListSkeleton />
        </Box>
      )}

      <DialogComp
        title="Add UOM"
        open={openForm}
        onClose={handleCloseForm}
        actions={
          <>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit(addUOM)} disabled={loading}>
              Add
            </Button>
          </>
        }
      >
        <TextFieldCtrl
          name="uom"
          control={control}
          label="UOM"
          rules={{
            required: "Field required",
          }}
        />
      </DialogComp>
    </>
  );
};
export default UOM;

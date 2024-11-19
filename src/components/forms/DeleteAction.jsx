"use client";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import useAPI from "@/hooks/useAPI";
import useDialog from "@/hooks/useDialog";
import DialogComp from "../Dialog";

const DeleteAction = ({ id_po }) => {
  const API = useAPI();
  const { isOpen, open, close } = useDialog();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const url = `/po/delete/${encodeURIComponent(id_po)}`;

    try {
      const res = await API.delete(url);
      toast.success(`${res.data.message}`);
      router.push("/dashboard");
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
      <Box sx={{ my: 8 }}>
        <Typography variant="h2" color="error">
          DANGER ZONE
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={open}>
          Delete Order Plan
        </Button>
      </Box>

      <DialogComp
        title={`Delete PO ${id_po}`}
        open={isOpen}
        onClose={close}
        actions={
          <>
            <Button onClick={close} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error" disabled={loading}>
              Delete
            </Button>
          </>
        }
      >
        <Typography>{`Are you sure you want to delete ${id_po}?`}</Typography>
      </DialogComp>
    </>
  );
};

export default DeleteAction;

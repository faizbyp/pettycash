"use client";

import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import {
  FormControlLabel,
  Box,
  RadioGroup,
  Radio,
  Button,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import TextFieldCtrl from "./TextField";
import { useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ApprovalAction = ({ id_user, id_po }) => {
  const [reject, setReject] = useState(false);
  const [approve, setApprove] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      status: "",
      id_user: id_user,
      approval_date: moment(),
      reject_notes: "",
    },
  });

  const handleApproval = async (values) => {
    setLoading(true);
    console.log(values, id_po);

    try {
      const res = await API.patch(`/po/approval/${id_po}`, values);
      toast.success(`${res.data.message}`);
      router.push("/admin");
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
    <Grid container spacing={4} sx={{ justifyContent: "end", textAlign: "right", mt: 4 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h2">Approval</Typography>
        <Box component="form" onSubmit={handleSubmit(handleApproval)} sx={{ width: "100%" }}>
          <Controller
            rules={{ required: true }}
            control={control}
            name="status"
            render={({ field }) => (
              <RadioGroup {...field} row sx={{ justifyContent: "end" }}>
                <FormControlLabel
                  value="approved"
                  control={<Radio />}
                  label="Approve"
                  labelPlacement="start"
                  onClick={() => {
                    setReject(false);
                    setApprove(true);
                    resetField("reject_notes");
                  }}
                />
                <FormControlLabel
                  value="rejected"
                  control={<Radio />}
                  label="Reject"
                  labelPlacement="start"
                  onClick={() => {
                    setApprove(false);
                    setReject(true);
                  }}
                />
              </RadioGroup>
            )}
          />
          {approve && (
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Approve
            </Button>
          )}
          {reject && (
            <Box sx={{ mt: 2 }}>
              <TextFieldCtrl
                multiline={true}
                rows={5}
                control={control}
                name="reject_notes"
                label="Reject Notes"
                rules={{
                  required: true,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="error"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                Reject
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ApprovalAction;

"use client";

import TextFieldCtrl from "@/components/forms/TextField";
import useAPI from "@/hooks/useAPI";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ReqResetPass = () => {
  const API = useAPI();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const ReqReset = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      const res = await API.post("/user/reset-password/request", values);
      if (res?.status === 200) {
        toast.success(res.data.message);
        router.replace(`/reset-pass/reset/${values.email}`);
      } else {
        toast.error("Failed to request", res.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Reset Password
        </Typography>
        <Typography variant="h2">Petty Cash KPN</Typography>
        <Box component="form" onSubmit={handleSubmit(ReqReset)} sx={{ width: "100%" }}>
          <TextFieldCtrl
            name="email"
            control={control}
            label="Email"
            rules={{
              required: "Field required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
          />
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {!loading ? "Send" : <CircularProgress size="1.8rem" />}
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <MuiLink href="/login" component={Link}>
            Login
          </MuiLink>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <MuiLink href="/register" component={Link}>
            Register
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
};

export default ReqResetPass;

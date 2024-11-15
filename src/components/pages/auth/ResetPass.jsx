"use client";

import { PasswordWithEye } from "@/components/forms/PasswordWithEye";
import SelectCtrl from "@/components/forms/Select";
import TextFieldCtrl from "@/components/forms/TextField";
import useAPI from "@/hooks/useAPI";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ResetPass = ({ email }) => {
  const API = useAPI();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: decodeURIComponent(email),
      otpInput: "",
      newPass: "",
    },
  });

  const onVerif = async (values) => {
    console.log(values);
    setLoading(true);

    try {
      const res = await API.post("/user/reset-password/verify", {
        email: values.email,
        otpInput: values.otpInput,
      });
      if (res?.status === 200) {
        toast.success(res.data.message);
        console.log(res);
        setVerified(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error?.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPass = async (values) => {
    console.log(values);
    setLoading(true);

    try {
      const res = await API.patch("/user/reset-password/reset", {
        email: values.email,
        newPass: values.newPass,
      });
      if (res?.status === 200) {
        toast.success(res.data.message);
        router.replace("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error?.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          {!verified ? "OTP Reset Password" : "Set New Password"}
        </Typography>
        <Typography variant="h2">Petty Cash KPN</Typography>
        {!verified ? (
          <Box component="form" onSubmit={handleSubmit(onVerif)} sx={{ width: "100%" }}>
            <TextFieldCtrl
              name="email"
              control={control}
              label="Email"
              readOnly
              rules={{
                required: "Field required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              }}
            />
            <TextFieldCtrl
              control={control}
              label="OTP Code"
              name="otpInput"
              rules={{
                required: "Field required",
                validate: {
                  length: (values) => values.length === 6 || "OTP is 6 character length",
                },
              }}
            />
            <Box sx={{ textAlign: "right" }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {!loading ? "Verify" : <CircularProgress size="1.8rem" />}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit(resetPass)} sx={{ width: "100%" }}>
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
            <PasswordWithEye
              name="newPass"
              control={control}
              label="New Password"
              rules={{ required: "Field required" }}
            />
            <Box sx={{ textAlign: "right" }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {!loading ? "Submit" : <CircularProgress size="1.8rem" />}
              </Button>
            </Box>
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <MuiLink href="/login" component={Link}>
            Login
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPass;

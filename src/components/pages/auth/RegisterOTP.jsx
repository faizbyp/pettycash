"use client";

import TextFieldCtrl from "@/components/forms/TextField";
import useAPI from "@/hooks/useAPI";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RegisterOTP = () => {
  const API = useAPI();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      resetField("email", { defaultValue: storedEmail });
    }
  }, [resetField]);

  const verifyOtp = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      const res = await API.post("/user/verify-otp", values);
      if (res?.status === 200) {
        toast.success(res.data.message);
        sessionStorage.removeItem("userEmail");
        router.replace("/login");
      } else {
        toast.error("Failed to register", res.data.message);
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
          Verify OTP
        </Typography>
        <Typography variant="h2">Petty Cash KPN</Typography>
        <Typography sx={{ mb: 2 }}>Please check OTP on your email</Typography>
        <Box component="form" onSubmit={handleSubmit(verifyOtp)} sx={{ width: "100%" }}>
          <TextFieldCtrl
            name="email"
            control={control}
            label="Email"
            readOnly
            rules={{ required: "Field required" }}
          />
          <TextFieldCtrl
            name="otp"
            control={control}
            label="OTP Code"
            rules={{
              required: "Field required",
              validate: {
                length: (values) => values.length === 6 || "OTP is 6 character length",
              },
            }}
          />
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {!loading ? "Register" : <CircularProgress size="1.8rem" />}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default RegisterOTP;

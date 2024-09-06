"use client";

import { PasswordWithEye } from "@/components/forms/PasswordWithEye";
import TextFieldCtrl from "@/components/forms/TextField";
import { Box, Button, Container, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function RegisterOtp() {
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

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box sx={{ height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Verify OTP
        </Typography>
        <Typography variant="h2">Petty Cash KPN</Typography>
        <Typography>Please check OTP on your email</Typography>
        <form>
          <Box sx={{ my: 2 }}>
            <TextFieldCtrl
              name="email"
              control={control}
              label="Email"
              readOnly
              rules={{ required: "Field required" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
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
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Register
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

"use client";

import { PasswordWithEye } from "@/components/forms/PasswordWithEye";
import TextFieldCtrl from "@/components/forms/TextField";
import { Box, Button, Container, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Login() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box sx={{ height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Login
        </Typography>
        <Typography variant="h2">Petty Cash KPN</Typography>
        <form>
          <Box sx={{ my: 2 }}>
            <TextFieldCtrl
              name="username"
              control={control}
              label="Username"
              rules={{ required: "Field required" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <PasswordWithEye
              name="password"
              control={control}
              label="Password"
              rules={{ required: "Field required" }}
            />
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
          </Box>
        </form>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <MuiLink href="/register" component={Link}>
            Register
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}

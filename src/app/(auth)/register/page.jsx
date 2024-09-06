"use client";

import { PasswordWithEye } from "@/components/forms/PasswordWithEye";
import TextFieldCtrl from "@/components/forms/TextField";
import { Box, Button, Container, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Register() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
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
          Register
        </Typography>
        <Typography variant="h2">Petty Cash KPN</Typography>
        <form>
          <Box sx={{ my: 2 }}>
            <TextFieldCtrl
              name="name"
              control={control}
              label="Name"
              rules={{ required: "Field required" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldCtrl
              name="email"
              control={control}
              label="Email"
              rules={{ required: "Field required" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
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
              Register
            </Button>
          </Box>
        </form>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <MuiLink href="/login" component={Link}>
            Login
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}

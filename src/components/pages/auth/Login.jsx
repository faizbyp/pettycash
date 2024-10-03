"use client";

import { PasswordWithEye } from "@/components/forms/PasswordWithEye";
import TextFieldCtrl from "@/components/forms/TextField";
import {
  Box,
  Button,
  Container,
  Typography,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginUser = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      redirect: false,
    };
    console.log(payload);
    try {
      const res = await signIn("credentials", payload);

      if (res?.status === 200) {
        const session = await getSession();
        if (session?.user.id_role === process.env.NEXT_PUBLIC_USER_ID) {
          location.replace("/dashboard");
        } else if (session?.user.id_role === process.env.NEXT_PUBLIC_ADMIN_ID) {
          location.replace("/admin");
        } else if (session?.user.id_role === process.env.NEXT_PUBLIC_FINANCE_ID) {
          location.replace("/finance/reports");
        } else {
          toast("Please try again");
        }
      } else if (res?.status === 401) {
        if (res.error) {
          toast.error(JSON.parse(res.error).message);
        } else {
          toast.error("Error");
        }
      } else {
        toast.error("Failed to login");
      }
    } catch (error) {
      console.error("Login Error", error);
      toast.error("Login Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Login
        </Typography>
        <Typography variant="h2">Petty Cash KPN</Typography>
        <Box component="form" onSubmit={handleSubmit(loginUser)} sx={{ width: "100%" }}>
          <TextFieldCtrl
            name="username"
            control={control}
            label="Username / Email"
            rules={{ required: "Field required" }}
          />
          <PasswordWithEye
            name="password"
            control={control}
            label="Password"
            rules={{ required: "Field required" }}
          />
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {!loading ? "Login" : <CircularProgress size="1.8rem" />}
            </Button>
          </Box>
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

export default Login;

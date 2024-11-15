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
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import useAuthStore from "@/hooks/useAuthStore";
import useAPI from "@/hooks/useAPI";

const Login = () => {
  const API = useAPI();
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginUser = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await API.post(`/user/login`, values);
      console.log(res.data.data);
      setAuth(res.data.data);
      toast.success(`${res.data.message}`);
      router.push("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        toast.error(data.message);
        console.error(error.response);
      } else {
        toast.error("Error, check log for details");
        console.error(error);
      }
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
          <MuiLink href="/reset-pass" component={Link}>
            Reset Password
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

export default Login;

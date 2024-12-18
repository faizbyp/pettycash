"use client";

import { PasswordWithEye } from "@/components/forms/PasswordWithEye";
import SelectCtrl from "@/components/forms/Select";
import TextFieldCtrl from "@/components/forms/TextField";
import useAPI from "@/hooks/useAPI";
import useSessionStorage from "@/hooks/useSessionStorage";
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

const Register = () => {
  const API = useAPI();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const [email, setEmail] = useSessionStorage("userEmail");
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      role: "",
    },
  });

  const registerUser = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      const res = await API.post("/user/register", values);
      if (res?.status === 200) {
        // sessionStorage.setItem("userEmail", values.email);
        toast.success(res.data.message);
        router.replace("/register/verify");
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
          Register
        </Typography>
        <Typography variant="h2">Petty Cash KPN</Typography>
        <Box component="form" onSubmit={handleSubmit(registerUser)} sx={{ width: "100%" }}>
          <TextFieldCtrl
            name="name"
            control={control}
            label="Name"
            rules={{ required: "Field required" }}
          />
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
          <TextFieldCtrl
            name="username"
            control={control}
            label="Username"
            rules={{ required: "Field required" }}
          />
          <PasswordWithEye
            name="password"
            control={control}
            label="Password"
            rules={{ required: "Field required" }}
          />
          <SelectCtrl
            name="role"
            label="Role"
            control={control}
            rules={{
              required: "Field required",
            }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="finance">Finance</MenuItem>
          </SelectCtrl>
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {!loading ? "Verify" : <CircularProgress size="1.8rem" />}
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <MuiLink href="/login" component={Link}>
            Login
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;

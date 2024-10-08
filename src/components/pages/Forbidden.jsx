"use client";

import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Forbidden = () => {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100svh",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Box>
        <Typography variant="h1" color="error">
          Forbidden
        </Typography>
        <Typography>You cannot access this page</Typography>
      </Box>
      <Button variant="contained" onClick={handleBack}>
        Go Back
      </Button>
      <MuiLink href="/login" component={Link}>
        Login
      </MuiLink>
    </Box>
  );
};
export default Forbidden;

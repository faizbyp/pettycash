"use client";

import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Forbidden = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h1">Forbidden</Typography>
      <Typography>You cannot access this page</Typography>
      <Button variant="contained" onClick={() => router.back()}>
        Go Back
      </Button>
      <MuiLink href="/login" component={Link}>
        Login
      </MuiLink>
    </Box>
  );
};
export default Forbidden;

import { Box, Typography } from "@mui/material";

export const metadata = {
  title: "Thank you - Petty Cash KPN",
};

export default function RegisterVerifyPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100svh",
        flexDirection: "column",
      }}
    >
      <Typography color="primary" variant="h1">
        Thank you for registering
      </Typography>
      <Typography>Please wait for verification. Check your email regularly.</Typography>
    </Box>
  );
}

"use client";

import Admin from "@/components/pages/Admin";
import Dashboard from "@/components/pages/Dashboard";
import Finance from "@/components/pages/Finance";
import { Box, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";

const DashboardSelect = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  switch (session?.user?.id_role) {
    case process.env.NEXT_PUBLIC_ADMIN_ID:
      return <Admin />;
    case process.env.NEXT_PUBLIC_USER_ID:
      return <Dashboard />;
    case process.env.NEXT_PUBLIC_FINANCE_ID:
      return <Finance />;
    default:
      console.error("NO ID_ROLE");
      return <Dashboard />;
  }
};
export default DashboardSelect;

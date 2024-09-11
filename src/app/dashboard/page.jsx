"use client";

import { useSessionName } from "@/components/PersistentDrawer";
import { Typography } from "@mui/material";

function DashboardPage() {
  const sessionName = useSessionName();
  return (
    <>
      <Typography variant="h1">Welcome, {sessionName}</Typography>
    </>
  );
}
export default DashboardPage;

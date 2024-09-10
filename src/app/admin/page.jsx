"use client";

import POTable from "@/components/POTable";
import { Typography, Box, Skeleton } from "@mui/material";
import useSWR from "swr";

function AdminPage() {
  const { data: po } = useSWR(`/po`);

  return (
    <>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Purchase Orders
      </Typography>
      {po ? (
        <POTable data={po.data} admin />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rounded" width="100%" height={64} />
          <Skeleton variant="rounded" width="100%" height={64} />
          <Skeleton variant="rounded" width="100%" height={64} />
        </Box>
      )}
    </>
  );
}
export default AdminPage;

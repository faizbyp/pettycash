"use client";

import POTable from "@/components/POTable";
import useFetch from "@/hooks/useFetch";
import { Box, MenuItem, Skeleton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

function NewPOPage() {
  const { data: session } = useSession();
  const { data: po } = useFetch(session ? `/po/user/${session.user.id_user}` : null);

  return (
    <Box component="main">
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        My Purchase Orders
      </Typography>
      {po ? (
        <POTable data={po.data} />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rounded" width="100%" height={64} />
          <Skeleton variant="rounded" width="100%" height={64} />
          <Skeleton variant="rounded" width="100%" height={64} />
        </Box>
      )}
    </Box>
  );
}
export default NewPOPage;

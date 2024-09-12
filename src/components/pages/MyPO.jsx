"use client";

import POTable from "@/components/POTable";
import useFetch from "@/hooks/useFetch";
import { Box, Button, MenuItem, Skeleton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { TableSkeleton } from "../Skeleton";

const MyPO = () => {
  const { data: session } = useSession();
  const { data: po } = useFetch(session ? `/po/user/${session.user.id_user}` : null);

  return (
    <Box component="main">
      <Box sx={{ mb: 1, display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="h1" sx={{ m: 0, color: "primary.main" }}>
          My Purchase Orders
        </Typography>
        <Link href="/dashboard/my-po/new" passHref>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add PO
          </Button>
        </Link>
      </Box>
      {po ? <POTable data={po.data} /> : <TableSkeleton column={7} />}
    </Box>
  );
};
export default MyPO;

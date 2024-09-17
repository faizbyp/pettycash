"use client";

import POTable from "@/components/POTable";
import useFetch from "@/hooks/useFetch";
import { Box, Button, MenuItem, Skeleton, Typography, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { TableSkeleton } from "../Skeleton";
import InfoIcon from "@mui/icons-material/Info";

const MyPO = () => {
  const { data: session } = useSession();
  const { data: po } = useFetch(session ? `/po/user/${session.user.id_user}` : null);

  const tableAction = (row) => (
    <Link href={`/dashboard/po/${encodeURIComponent(row.id_po)}`} passHref>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Link>
  );

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
      {po ? <POTable data={po.data} actions={tableAction} /> : <TableSkeleton column={7} />}
    </Box>
  );
};
export default MyPO;

"use client";

import POTable from "@/components/POTable";
import useFetch from "@/hooks/useFetch";
import { Box, Button, MenuItem, Skeleton, Typography, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from "next/link";
import { TableSkeleton } from "../../Skeleton";

const GR = () => {
  const { data: session } = useSession();
  const { data: po } = useFetch(
    session ? `/po/user/${session.user.id_user}?status=approved&is_complete=false` : null
  );
  const tableAction = (row) => (
    <Link href={`/dashboard/my-gr/new/${encodeURIComponent(row.id_po)}`} passHref>
      <IconButton>
        <AddCircleIcon />
      </IconButton>
    </Link>
  );

  return (
    <Box component="main">
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Create Order Confirmation
      </Typography>
      {po ? <POTable data={po.data} actions={tableAction} /> : <TableSkeleton column={7} />}
    </Box>
  );
};
export default GR;

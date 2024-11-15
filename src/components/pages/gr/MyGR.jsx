"use client";

import useFetch from "@/hooks/useFetch";
import { Box, Button, MenuItem, Skeleton, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { TableSkeleton } from "../../Skeleton";
import InfoIcon from "@mui/icons-material/Info";
import GRTable from "../../GRTable";
import useAuthStore from "@/hooks/useAuthStore";

const MyGR = () => {
  const id_user = useAuthStore((state) => state.id_user);
  const { data: gr } = useFetch(id_user ? `/gr/user/${id_user}` : null);

  const tableAction = (row) => (
    <Link href={`/dashboard/gr/${encodeURIComponent(row.id_gr)}`} passHref>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Link>
  );

  return (
    <Box component="main">
      <Box sx={{ mb: 1, display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="h1" sx={{ m: 0, color: "primary.main" }}>
          My Order Confirmation
        </Typography>
        <Link href="/dashboard/my-gr/new" passHref>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add Confirmation
          </Button>
        </Link>
      </Box>
      {gr ? <GRTable data={gr.data} actions={tableAction} /> : <TableSkeleton column={7} />}
    </Box>
  );
};
export default MyGR;

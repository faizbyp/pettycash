"use client";

import POTable from "@/components/POTable";
import { Typography, Box, Skeleton, Grid2 as Grid, IconButton } from "@mui/material";
import useSWR from "swr";
import { TableSkeleton } from "../Skeleton";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import GRTable from "../GRTable";
import ReportCharts from "../ReportCharts";

const Admin = () => {
  const { data: po } = useSWR(`/po`);
  const { data: gr } = useSWR(`/gr`);

  const poTableAction = (row) => (
    <Link href={`/dashboard/approval/${encodeURIComponent(row.id_po)}`} passHref>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Link>
  );

  const grTableAction = (row) => (
    <Link href={`/dashboard/gr/${encodeURIComponent(row.id_gr)}`} passHref>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Link>
  );

  return (
    <Box component="main">
      <Typography variant="h1">Admin Dashboard</Typography>
      <ReportCharts
        amount={gr?.money_spent.sum}
        companyCount={po?.company_count}
        poStatusCount={po?.status_count}
        grStatusCount={gr?.status_count}
      />
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Order Planning
      </Typography>
      {po ? <POTable data={po.data} admin actions={poTableAction} /> : <TableSkeleton column={8} />}
      <Typography variant="h1" sx={{ color: "primary.main", mt: 2 }}>
        Order Confirmation
      </Typography>
      {gr ? <GRTable data={gr.data} admin actions={grTableAction} /> : <TableSkeleton column={8} />}
    </Box>
  );
};
export default Admin;

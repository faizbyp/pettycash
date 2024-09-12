"use client";

import POTable from "@/components/POTable";
import { Typography, Box, Skeleton } from "@mui/material";
import useSWR from "swr";
import { TableSkeleton } from "../Skeleton";

const Admin = () => {
  const { data: po } = useSWR(`/po`);

  return (
    <>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Purchase Orders
      </Typography>
      {po ? <POTable data={po.data} admin /> : <TableSkeleton column={8} />}
    </>
  );
};
export default Admin;

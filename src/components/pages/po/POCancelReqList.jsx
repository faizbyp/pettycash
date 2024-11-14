"use client";

import useFetch from "@/hooks/useFetch";
import POTable from "../../POTable";
import { TableSkeleton } from "../../Skeleton";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Typography } from "@mui/material";
import Link from "next/link";

const POCancelReqList = () => {
  const { data: po } = useFetch(`/po?req_cancel=true`);

  const tableAction = (row) => (
    <Link href={`/dashboard/po/${encodeURIComponent(row.id_po)}`} passHref>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Link>
  );

  return (
    <>
      <Typography variant="h1" color="primary">
        Order Plan Cancel Request
      </Typography>
      {po ? <POTable data={po.data} actions={tableAction} /> : <TableSkeleton column={7} />}
    </>
  );
};
export default POCancelReqList;

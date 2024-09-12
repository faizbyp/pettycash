"use client";

import ApprovalAction from "@/components/forms/ApprovalAction";
import ItemTable from "@/components/ItemTable";
import POFooter from "@/components/POFooter";
import POHeader from "@/components/POHeader";
import { statusColor } from "@/helper/helper";
import useFetch from "@/hooks/useFetch";
import { Box, Skeleton, Typography, Chip } from "@mui/material";
import { useSession } from "next-auth/react";
import { POSkeleton } from "../Skeleton";

const PODetails = ({ idPO }) => {
  const { data: session } = useSession();
  let { data: po } = useFetch(`/po/${encodeURIComponent(idPO)}`);

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
        <Typography variant="h1" sx={{ color: "primary.main", m: 0 }}>
          {idPO}
        </Typography>
        {po && <Chip color={statusColor(po.data.status)} label={po.data.status} />}
      </Box>
      {po && session ? (
        <>
          <POHeader
            company={po.data.company}
            vendor={po.data.vendor}
            idPO={idPO}
            po_date={po.data.po_date}
          />
          <ItemTable data={po.data.items} />
          <POFooter
            notes={po.data.notes}
            total={{
              sub_total: po.data.sub_total,
              ppn: parseFloat(po.data.ppn),
              grand_total: po.data.grand_total,
            }}
          />
          {po.data.status === "pending" && (
            <ApprovalAction id_user={session?.user?.id_user} id_po={encodeURIComponent(idPO)} />
          )}
        </>
      ) : (
        <POSkeleton />
      )}
    </>
  );
};
export default PODetails;

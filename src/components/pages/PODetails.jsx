"use client";

import ApprovalAction from "@/components/forms/ApprovalAction";
import ItemTable from "@/components/ItemTable";
import POFooter from "@/components/POFooter";
import POHeader from "@/components/POHeader";
import { statusColor } from "@/helper/helper";
import useFetch from "@/hooks/useFetch";
import { Box, Skeleton, Typography, Chip, Button, Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import { POSkeleton } from "../Skeleton";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

const PODetails = ({ idPO }) => {
  const { data: session } = useSession();
  let { data: po } = useFetch(`/po/${encodeURIComponent(idPO)}`);
  const docRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => docRef.current,
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="h1" sx={{ color: "primary.main", m: 0 }}>
            {idPO}
          </Typography>
          {po && <Chip color={statusColor(po.data.status)} label={po.data.status} />}
        </Box>
        {po && po.data.status === "approved" && (
          <Button onClick={handlePrint} variant="contained" startIcon={<PrintIcon />}>
            Print
          </Button>
        )}
      </Box>
      {po && session ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper sx={{ width: "210mm" }}>
              <Box
                ref={docRef}
                sx={{
                  p: 8,
                  "& *": {
                    fontSize: "12px !important", // Apply the inherited font size to all direct children
                  },
                }}
              >
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
              </Box>
            </Paper>
          </Box>
          {session?.user?.id_role === process.env.NEXT_PUBLIC_ADMIN_ID &&
            po.data.status === "pending" && (
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

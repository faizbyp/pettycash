"use client";

import ApprovalAction from "@/components/forms/ApprovalAction";
import ItemTable from "@/components/ItemTable";
import POFooter from "@/components/POFooter";
import POHeader from "@/components/POHeader";
import { statusColor } from "@/helper/helper";
import useFetch from "@/hooks/useFetch";
import { Box, Typography, Chip, Button, Paper, TextField } from "@mui/material";
import { POSkeleton } from "../../Skeleton";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import moment from "moment";
import useAuthStore from "@/hooks/useAuthStore";

const GRDetails = ({ idGR }) => {
  const id_role = useAuthStore((state) => state.id_role);
  const id_user = useAuthStore((state) => state.id_user);
  let { data: gr } = useFetch(`/gr/${encodeURIComponent(idGR)}`);
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
            {idGR}
          </Typography>
          {gr && <Chip color={statusColor(gr.data.status)} label={gr.data.status} />}
        </Box>
        {gr && gr.data.status === "approved" && (
          <Button onClick={handlePrint} variant="contained" startIcon={<PrintIcon />}>
            Print
          </Button>
        )}
      </Box>
      {gr ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {gr && gr.data.status === "rejected" && (
              <TextField
                label="Reject Notes"
                multiline
                rows={5}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                value={gr.data.reject_notes}
                fullWidth
              />
            )}
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
                  company={gr.data.company}
                  vendor={gr.data.vendor}
                  idPO={idGR}
                  po_date={gr.data.po_date}
                  gr_date={gr.data.gr_date}
                  title="Print Order Confirmation"
                />
                <ItemTable data={gr.data.items} />
                <POFooter
                  approvalBy={gr.data.approval_by}
                  approvalDate={
                    gr.data.status === "approved"
                      ? moment(gr.data.approval_date).format("DD-MM-YYYY")
                      : undefined
                  }
                  GR
                  invoice={{
                    number: gr.data.invoice_num,
                    file: gr.data.invoice_file,
                  }}
                  notes={gr.data.notes}
                  total={{
                    sub_total: gr.data.sub_total,
                    ppn: parseFloat(gr.data.ppn),
                    grand_total: gr.data.grand_total,
                  }}
                />
              </Box>
            </Paper>
          </Box>
          {id_role === process.env.NEXT_PUBLIC_ADMIN_ID && gr.data.status === "pending" && (
            <ApprovalAction id_user={id_user} id_gr={encodeURIComponent(idGR)} />
          )}
        </>
      ) : (
        <POSkeleton />
      )}
    </>
  );
};
export default GRDetails;

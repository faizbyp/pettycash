"use client";

import ApprovalAction from "@/components/forms/ApprovalAction";
import ItemTable from "@/components/ItemTable";
import POFooter from "@/components/POFooter";
import POHeader from "@/components/POHeader";
import { statusColor } from "@/helper/helper";
import useFetch from "@/hooks/useFetch";
import { Box, Typography, Chip, Button, Paper, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { POSkeleton } from "../Skeleton";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import TextFieldCtrl from "../forms/TextField";
import { useForm } from "react-hook-form";
import DialogComp from "../Dialog";
import API from "@/services/api";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CancelReqAction from "../forms/CancelReqAction";

const PODetails = ({ idPO }) => {
  const router = useRouter();
  const { data: session } = useSession();
  let { data: po } = useFetch(`/po/${encodeURIComponent(idPO)}`);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTheirPO, setIsTheirPO] = useState(false);
  const docRef = useRef();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      cancel_reason: "",
    },
  });

  const handlePrint = useReactToPrint({
    content: () => docRef.current,
  });

  useEffect(() => {
    if (session?.user?.id_user === po?.data?.id_user) {
      setIsTheirPO(true);
    }
  }, [session, po]);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenForm(false);
  };

  const handleEdit = () => {
    router.push(`/dashboard/my-po/edit/${encodeURIComponent(idPO)}`);
  };

  const onReqCancel = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await API.patch(`/po/req-cancel/${encodeURIComponent(idPO)}`, values);
      toast.success(`${res.data.message}`);
      router.replace("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        toast.error(data.message);
      } else {
        toast.error("Error");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
          {po && po.data.cancel_reason && <Chip color="warning" label="Waiting for cancellation" />}
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {po && po.data.status === "canceled" && (
            <Button onClick={handleEdit} variant="contained" color="warning" disabled={!isTheirPO}>
              Edit
            </Button>
          )}
          {po && !po.data.has_gr && !po.data.cancel_reason && po.data.status === "approved" && (
            <Button onClick={handleOpenForm} variant="contained" color="error">
              Cancel
            </Button>
          )}
          {po && po.data.status === "approved" && (
            <Button onClick={handlePrint} variant="contained" startIcon={<PrintIcon />}>
              Print
            </Button>
          )}
        </Box>
      </Box>
      {po && po.data.cancel_reason && (
        <Box sx={{ my: 2 }}>
          <Typography color="text.secondary">
            <Typography color="warning" component="span">
              {`Cancel Reason: `}
            </Typography>
            {po.data.cancel_reason}
          </Typography>
        </Box>
      )}
      {po && session ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {po && po.data.status === "rejected" && (
              <TextField
                label="Reject Notes"
                multiline
                rows={5}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                value={po.data.reject_notes}
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
                  company={po.data.company}
                  vendor={po.data.vendor}
                  idPO={idPO}
                  po_date={po.data.po_date}
                  title="Print Order Planning"
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
          {session?.user?.id_role === process.env.NEXT_PUBLIC_ADMIN_ID && po.data.cancel_reason && (
            <CancelReqAction id_po={idPO} />
          )}
        </>
      ) : (
        <POSkeleton />
      )}

      <DialogComp
        title="Cancel Order Plan"
        open={openForm}
        onClose={handleCloseForm}
        actions={
          <>
            <Button onClick={handleCloseForm}>Close</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleSubmit(onReqCancel)}
              disabled={loading}
            >
              Cancel
            </Button>
          </>
        }
      >
        <TextFieldCtrl
          control={control}
          name="cancel_reason"
          label="Cancel Reason"
          rules={{
            required: "Field required",
          }}
        />
      </DialogComp>
    </>
  );
};
export default PODetails;

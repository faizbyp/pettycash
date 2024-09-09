"use client";

import useFetch from "@/hooks/useFetch";
import useSessionStorage from "@/hooks/useSessionStorage";
import DatePickerCtrl from "@/components/forms/DatePicker";
import SelectCtrl from "@/components/forms/Select";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldCtrl from "@/components/forms/TextField";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import NumericFieldCtrl from "@/components/forms/NumericField";
import CurrencyField from "@/components/forms/CurrencyField";
import ItemTable from "@/components/ItemTable";
import { calculateTotal, formatPercent, formatThousand } from "@/helper/helper";
import API from "@/services/api";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import CheckboxCtrl from "@/components/forms/Checkbox";
import { WatchLater } from "@mui/icons-material";
import { useSession } from "next-auth/react";

function NewPO2Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [poData, setPoData] = useSessionStorage("poData");
  const { data: company } = useFetch(poData ? `/company/${poData.company}` : null);
  const { data: vendor } = useFetch(poData ? `/vendor/${poData.vendor}` : null);
  const { data: uom } = useFetch("/uom");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPPN, setIsPPN] = useState(false);

  const {
    control: poControl,
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      po_date: moment(),
      id_company: "",
      id_vendor: "",
      id_user: "",
      notes: "",
      sub_total: 0,
      ppn: false,
      grand_total: 0,
    },
  });

  const {
    control: itemControl,
    handleSubmit: handleItem,
    reset: resetItemForm,
  } = useForm({
    defaultValues: {
      id_po_item: "",
      id_po: "",
      description: "",
      unit_price: 0,
      qty: 0,
      uom: "",
      amount: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: poControl,
    name: "items",
    rules: {
      required: true,
    },
  });

  useEffect(() => {
    if (poData) {
      setValue("po_date", poData.po_date);
      setValue("id_company", poData.company);
      setValue("id_vendor", poData.vendor);
    }
  }, [poData, setValue]);

  useEffect(() => {
    setValue("sub_total", calculateTotal(fields, "amount"));
    setValue(
      "grand_total",
      watch("ppn")
        ? getValues("sub_total") + getValues("sub_total") * (11 / 100)
        : getValues("sub_total")
    );
    console.log("grand totalll", getValues("grand_total"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, getValues, watch("ppn"), fields]);

  const onPrev = () => {
    router.back();
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenForm(false);
  };

  const addItem = async (values) => {
    values = {
      ...values,
      amount: values.unit_price * values.qty,
    };
    append(values);
    resetItemForm();
    handleCloseForm();
  };

  const deleteItem = async (index) => {
    remove(index);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    values = {
      ...values,
      id_user: session?.user?.id_user,
    };
    console.log(values);

    try {
      const res = await API.post("/po", { data: values });
      toast.success(`${res.data.message}
        ${res.data.id_po}`);
      router.push("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        toast.error(data.message);
      } else {
        toast.error("Error");
      }
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="main">
        <Button onClick={() => onPrev()}>Back</Button>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Create New PO - 2
        </Typography>
        {company && vendor && poData ? (
          <>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography>{company.data.company_name}</Typography>
                <Typography>{company.data.company_addr}</Typography>
                <Typography>Phone: {company.data.company_phone}</Typography>
                <Typography>Fax: {company.data.company_fax}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography>Date</Typography>
                <Typography>{moment(poData.po_date).format("DD/MM/YYYY")}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography>Vendor: {vendor.data.vendor_name}</Typography>
            <form>
              <Box sx={{ mt: 4, display: "flex", gap: 2, alignItems: "center" }}>
                <Typography variant="h2" sx={{ m: 0 }}>
                  Items
                </Typography>
                <Button variant="outlined" onClick={handleOpenForm}>
                  Add Item
                </Button>
              </Box>
              <ItemTable data={fields} onDelete={deleteItem} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextFieldCtrl
                    multiline={true}
                    rows={5}
                    control={poControl}
                    name="notes"
                    label="Notes"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: "flex", gap: 16, justifyContent: "end" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Sub Total</Typography>
                      <Typography>Grand Total</Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography>{formatThousand(watch("sub_total"))}</Typography>
                      <CheckboxCtrl name="ppn" control={poControl} label="PPN 11%" noMargin />
                      <Typography>{formatThousand(watch("grand_total"))}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={loading}>
                  Submit
                </Button>
              </Box>
            </form>
          </>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Skeleton variant="rounded" width="100%" height={64} />
            <Skeleton variant="rounded" width="100%" height={64} />
            <Skeleton variant="rounded" width="100%" height={64} />
          </Box>
        )}
      </Box>

      {/* ADD ITEM DIALOG */}
      <Dialog open={openForm} onClose={handleCloseForm} aria-modal="true" fullWidth maxWidth="sm">
        <DialogTitle>Add Item</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseForm}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <TextFieldCtrl
              control={itemControl}
              name="description"
              label="Description"
              rules={{
                required: "Field required",
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <CurrencyField
              control={itemControl}
              name="unit_price"
              label="Unit Price"
              rules={{
                required: "Field required",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <NumericFieldCtrl
              control={itemControl}
              name="qty"
              label="Quantity"
              min={0}
              rules={{
                required: "Field required",
              }}
            />
            <SelectCtrl
              name="uom"
              label="UOM"
              control={itemControl}
              rules={{
                required: "Field required",
              }}
            >
              {uom &&
                uom.data.map((data) => (
                  <MenuItem key={data.uom} value={data.uom}>
                    {data.uom}
                  </MenuItem>
                ))}
            </SelectCtrl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant="contained" onClick={handleItem(addItem)}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* END ADD ITEM DIALOG */}
    </>
  );
}
export default NewPO2Page;

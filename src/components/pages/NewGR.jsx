"use client";

import useFetch from "@/hooks/useFetch";
import useSessionStorage from "@/hooks/useSessionStorage";
import SelectCtrl from "@/components/forms/Select";
import TextFieldCtrl from "@/components/forms/TextField";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
  Checkbox,
  InputAdornment,
  MenuList,
  Paper,
  TextField,
  ListItemIcon,
  ListItemText,
  FormHelperText,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import NumericFieldCtrl from "@/components/forms/NumericField";
import CurrencyField from "@/components/forms/CurrencyField";
import ItemTable from "@/components/ItemTable";
import { allowedFormat, calculateTotal } from "@/helper/helper";
import API from "@/services/api";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import POFooter from "@/components/POFooter";
import POHeader from "@/components/POHeader";
import DialogComp from "@/components/Dialog";
import { POSkeleton } from "../Skeleton";
import FileInput from "@/components/forms/FileInput";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckboxCtrl from "../forms/Checkbox";
import DatePickerCtrl from "../forms/DatePicker";

const NewGR = ({ idPO }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: po } = useFetch(`/gr/po/${encodeURIComponent(idPO)}`);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sameData, setSameData] = useState(true);
  const [refPoItems, setRefPoItems] = useState([]);
  const [poItems, setPoItems] = useState([
    {
      id_po_item: "",
    },
  ]);

  const {
    control: grControl,
    handleSubmit,
    reset: resetGr,
    setValue: setGrValue,
    watch: watchGr,
    getValues: getGrValues,
  } = useForm({
    defaultValues: {
      gr_date: moment(),
      id_po: "",
      notes: "",
      sub_total: 0,
      ppn: false,
      grand_total: 0,
      invoice_num: "",
    },
  });

  const {
    control: grItemControl,
    handleSubmit: handleGrItem,
    reset: resetGrItem,
    getValues: getGrItem,
  } = useForm({
    defaultValues: {
      id_po_item: "",
      id_po: "",
      description: "",
      unit_price: 0,
      qty: 0,
      uom: "",
      amount: 0,
      notes: "",
      is_complete: true,
    },
  });

  const {
    fields: grFields,
    append: appendGrItem,
    remove: removeGrItem,
  } = useFieldArray({
    control: grControl,
    name: "items",
    rules: {
      required: true,
    },
  });

  useEffect(() => {
    if (po) {
      setPoItems(po.data.items);
      setRefPoItems(po.data.items);
      resetGr({ id_po: po.data.id_po });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [po]);

  useEffect(() => {
    setGrValue("sub_total", calculateTotal(grFields, "amount"));
    setGrValue(
      "grand_total",
      watchGr("ppn")
        ? getGrValues("sub_total") + getGrValues("sub_total") * (11 / 100)
        : getGrValues("sub_total")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGrValue, watchGr("ppn"), grFields]);

  const getRemainingQty = (array, id) => {
    const filter = array.filter((item) => item.id_po_item === id);
    if (filter.length > 0 && filter[0].hasOwnProperty("remaining_qty")) {
      return Number(filter[0].remaining_qty);
    } else {
      return "N/A";
    }
  };

  const handleOpenForm = (values, index) => {
    console.log("ITEM INDEX", index);
    console.log("PO ITEMS", poItems);
    resetGrItem({
      id_po_item: values.id_po_item,
      id_po: values.id_po,
      description: values.description,
      unit_price: values.unit_price,
      qty: values.qty,
      uom: values.uom,
      amount: values.amount,
      notes: "",
      is_complete: values.is_complete,
    });
    setSameData(true);
    setOpenForm(true);
  };

  const handleCloseForm = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setSameData(true);
    setOpenForm(false);
  };

  const addItem = (values) => {
    values = {
      ...values,
      amount: values.unit_price * values.qty,
    };
    console.log("valueeee", values);
    if (values.qty === getRemainingQty(poItems, getGrItem("id_po_item"))) {
      values["is_complete"] = true;
    }
    appendGrItem(values);
    setPoItems((prev) => prev.filter((item) => item.id_po_item !== values.id_po_item));
    handleCloseForm();
  };

  const deleteItem = useCallback(
    (values, index) => {
      const restoredItem = refPoItems.find((item) => item.id_po_item === values.id_po_item);
      console.log("restored item", restoredItem);
      setPoItems((prev) => [...prev, restoredItem]);
      removeGrItem(index);
    },
    [refPoItems, removeGrItem]
  );

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    // add form data
    // override API content type to form data
    const formData = new FormData();
    formData.append("file", values.invoice_file, values.invoice_file.name);
    values = { ...values, invoice_file: values.invoice_file.name };
    formData.append("data", JSON.stringify(values));
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await API.post("/gr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      <Box component="main">
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Create New Order Confirmation
        </Typography>
        <Typography variant="h2">Order Plan: {idPO}</Typography>
        <Box sx={{ width: "50%" }}>
          <DatePickerCtrl
            name="gr_date"
            label="Order Conf. Date"
            control={grControl}
            rules={{
              required: "Field required",
            }}
            onChange={(value) => {
              setGrValue("gr_date", value);
            }}
          />
        </Box>
        {po ? (
          <>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h3" sx={{ m: 0, color: "primary.main" }}>
                Add Items From Order Plan
              </Typography>
              <MenuList>
                {poItems.map((data, index) => (
                  <MenuItem
                    key={data.id_po_item}
                    value={data}
                    onClick={() => handleOpenForm(data, index)}
                  >
                    <ListItemIcon>
                      <AddRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>{data.description}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
            <POHeader
              company={po.data.company}
              vendor={po.data.vendor}
              po_date={po.data.po_date}
              title="Order Confirmation"
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="h2" sx={{ color: "primary.main" }}>
                Items
              </Typography>
            </Box>
            <ItemTable data={grFields} onDelete={deleteItem} GR />
            <POFooter
              control={grControl}
              watch={{
                sub_total: watchGr("sub_total"),
                grand_total: watchGr("grand_total"),
                ppn: watch("ppn"),
              }}
            />
            <Typography variant="h2" sx={{ color: "primary.main" }}>
              Invoice
            </Typography>
            <TextFieldCtrl
              control={grControl}
              name="invoice_num"
              label="Invoice No."
              rules={{
                required: "Field required",
                validate: {
                  character: (values) =>
                    !/[\\/:*?"<>|]/.test(values) || `Cannot contain \\ / : * ? " < > |`,
                  spaceAndDot: (values) =>
                    !/[. ]$/.test(values) || `Cannot end with space or period`,
                },
              }}
            />
            <FileInput
              control={grControl}
              name="invoice_file"
              label="Upload Invoice"
              rules={{
                required: "Invoice is required",
                validate: {
                  maxSize: (files) => files?.size < 10485760 || "Max 10MB Allowed",
                  format: (files) =>
                    allowedFormat.includes(files?.type) || "File format not allowed",
                },
              }}
            />
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button variant="contained" disabled={loading} onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Box>
          </>
        ) : (
          <POSkeleton />
        )}
      </Box>

      {poItems && (
        <DialogComp
          title="Add Item"
          open={openForm}
          onClose={handleCloseForm}
          actions={
            <>
              <Button onClick={handleCloseForm}>Cancel</Button>
              <Button variant="contained" onClick={handleGrItem(addItem)}>
                Add
              </Button>
            </>
          }
        >
          <TextFieldCtrl
            control={grItemControl}
            name="description"
            label="Description"
            rules={{
              required: "Field required",
            }}
            disabled
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sameData}
                onChange={() => {
                  setSameData(!sameData);
                  resetGrItem();
                }}
              />
            }
            label="Same data as plan"
            sx={{ m: 0, mb: 2 }}
          />
          <CurrencyField
            control={grItemControl}
            name="unit_price"
            label="Unit Price"
            rules={{
              required: "Field required",
            }}
            disabled={sameData}
          />
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <NumericFieldCtrl
              control={grItemControl}
              name="qty"
              label="Quantity"
              disabled={sameData}
              min={0}
              rules={{
                required: "Field required",
                validate: {
                  max: (values) =>
                    values <= getRemainingQty(poItems, getGrItem("id_po_item")) ||
                    "Cannot exceed remaining quantity",
                },
              }}
            />
            <TextField
              label="UOM"
              value={getGrItem("uom")}
              variant="outlined"
              disabled
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormHelperText>
              {`Remaining Qty: ${getRemainingQty(poItems, getGrItem("id_po_item"))}`}
            </FormHelperText>
          </Box>
          <TextFieldCtrl control={grItemControl} name="notes" label="Notes" />
          <CheckboxCtrl
            name="is_complete"
            control={grItemControl}
            label="Mark as completed (no further purchases will be added)"
            noMargin
          />
        </DialogComp>
      )}
    </>
  );
};
export default NewGR;

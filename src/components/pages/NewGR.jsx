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
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import NumericFieldCtrl from "@/components/forms/NumericField";
import CurrencyField from "@/components/forms/CurrencyField";
import ItemTable from "@/components/ItemTable";
import { calculateTotal } from "@/helper/helper";
import API from "@/services/api";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import POFooter from "@/components/POFooter";
import POHeader from "@/components/POHeader";
import DialogComp from "@/components/Dialog";
import { POSkeleton } from "../Skeleton";
import FileInput from "@/components/forms/FileInput";

const NewGR = ({ idPO }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: po } = useFetch(`/po/${encodeURIComponent(idPO)}`);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);
  const [sameData, setSameData] = useState(true);

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
      // id_gr_item: "",
      // id_gr: "",
      // id_po_item: "",
      // qty: "",
      // notes: "",
      id_po_item: "",
      id_po: "",
      description: "",
      unit_price: 0,
      qty: 0,
      uom: "",
      amount: 0,
      notes: "",
    },
  });

  const {
    control: poItemControl,
    handleSubmit: handlePoItem,
    reset: resetPoItem,
    getValues: getPoItemValues,
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

  const {
    fields: poFields,
    append: appendPoItem,
    remove: removePoItem,
  } = useFieldArray({
    control: poItemControl,
    name: "poItems",
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
      resetPoItem({ poItems: po.data.items });
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
    console.log("grand totalll", getGrValues("grand_total"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGrValue, getGrValues, watchGr("ppn"), grFields]);

  const handleOpenForm = (values, index) => {
    console.log("ITEM INDEX", index);
    setItemIndex(index);
    console.log("PO FIELDS", poFields);
    resetPoItem({
      id_po_item: values.id_po_item,
      id_po: values.id_po,
      description: values.description,
      unit_price: values.unit_price,
      qty: values.qty,
      uom: values.uom,
      amount: values.amount,
    });
    resetGrItem({
      id_po_item: values.id_po_item,
      id_po: values.id_po,
      description: values.description,
      unit_price: values.unit_price,
      qty: values.qty,
      uom: values.uom,
      amount: values.amount,
    });
    setOpenForm(true);
  };

  const handleCloseForm = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenForm(false);
  };

  const addItem = (values) => {
    console.log("REMOVE INDEX", itemIndex);
    values = {
      ...values,
      amount: values.unit_price * values.qty,
    };
    console.log(values);
    appendGrItem(values);
    // removePoItem(itemIndex);
    handleCloseForm();
  };

  const deleteItem = (values, index) => {
    // appendPoItem(values);
    removeGrItem(index);
  };

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
      router.push("/dashboard");
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
        <Typography variant="h2">PO: {idPO}</Typography>
        {po ? (
          <>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h3" sx={{ m: 0, color: "primary.main" }}>
                Add Items From Order Plan
              </Typography>
              <MenuList>
                {poFields.map((data, index) => (
                  <MenuItem
                    key={data.id_po_item}
                    value={data}
                    onClick={() => handleOpenForm(data, index)}
                  >
                    {data.description}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
            <POHeader company={po.data.company} vendor={po.data.vendor} po_date={po.data.po_date} />
            <Typography variant="h2">Items</Typography>
            <ItemTable data={grFields} onDelete={deleteItem} GR />
            <POFooter
              control={grControl}
              watch={{
                sub_total: watchGr("sub_total"),
                grand_total: watchGr("grand_total"),
              }}
            />
            <Typography variant="h2">Invoice</Typography>
            <TextFieldCtrl
              control={grControl}
              name="invoice_num"
              label="Invoice No."
              rules={{
                required: "Field required",
              }}
            />
            <FileInput
              control={grControl}
              name="invoice_file"
              label="Upload Invoice"
              rules={{ required: "Invoice is required" }}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </>
        ) : (
          <POSkeleton />
        )}
      </Box>

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
          control={<Checkbox checked={sameData} onChange={() => setSameData(!sameData)} />}
          label="Same data as plan"
          sx={{ mb: 2 }}
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  values <= getPoItemValues("qty") || "Cannot exceed planned quantity",
              },
            }}
          />
          <Typography>{getPoItemValues("uom")}</Typography>
        </Box>
        <TextFieldCtrl control={grItemControl} name="notes" label="Notes" />
      </DialogComp>
    </>
  );
};
export default NewGR;

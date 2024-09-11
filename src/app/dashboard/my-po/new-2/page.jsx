"use client";

import useFetch from "@/hooks/useFetch";
import useSessionStorage from "@/hooks/useSessionStorage";
import SelectCtrl from "@/components/forms/Select";
import TextFieldCtrl from "@/components/forms/TextField";
import { Box, Button, MenuItem, Skeleton, Typography } from "@mui/material";
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

function NewPO2Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [poData, setPoData] = useSessionStorage("poData");
  const { data: company } = useFetch(poData ? `/company/${poData.company}` : null);
  const { data: vendor } = useFetch(poData ? `/vendor/${poData.vendor}` : null);
  const { data: uom } = useFetch("/uom");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
            <POHeader company={company.data} vendor={vendor.data} po_date={poData.po_date} />
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
              <POFooter
                control={poControl}
                watch={{
                  sub_total: watch("sub_total"),
                  grand_total: watch("grand_total"),
                }}
              />
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

      <DialogComp
        title="Add Item"
        open={openForm}
        onClose={handleCloseForm}
        actions={
          <>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button variant="contained" onClick={handleItem(addItem)}>
              Add
            </Button>
          </>
        }
      >
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
      </DialogComp>
    </>
  );
}
export default NewPO2Page;

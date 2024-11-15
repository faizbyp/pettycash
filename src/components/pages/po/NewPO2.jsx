"use client";

import useFetch from "@/hooks/useFetch";
import useSessionStorage from "@/hooks/useSessionStorage";
import SelectCtrl from "@/components/forms/Select";
import TextFieldCtrl from "@/components/forms/TextField";
import { Box, Button, MenuItem, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import NumericFieldCtrl from "@/components/forms/NumericField";
import CurrencyField from "@/components/forms/CurrencyField";
import ItemTable from "@/components/ItemTable";
import { calculateTotal } from "@/helper/helper";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import POFooter from "@/components/POFooter";
import POHeader from "@/components/POHeader";
import DialogComp from "@/components/Dialog";
import { POSkeleton } from "../../Skeleton";
import useAuthStore from "@/hooks/useAuthStore";
import useAPI from "@/hooks/useAPI";

const NewPO2 = ({ idPO }) => {
  const API = useAPI();
  const router = useRouter();
  const id_user = useAuthStore((state) => state.id_user);
  const [poData, setPoData] = useSessionStorage("poData");
  const { data: uom } = useFetch("/uom");

  const isEdit = Boolean(idPO);

  // ADD PO FETCH
  const { data: company } = useFetch(!isEdit && poData ? `/company/${poData.company}` : null);
  const { data: vendor } = useFetch(!isEdit && poData ? `/vendor/${poData.vendor}` : null);

  // EDIT PO FETCH
  const { data: editData } = useFetch(isEdit && `/po/${encodeURIComponent(idPO)}`);
  const [editIndex, setEditIndex] = useState(null);
  const [deletedItems, setDeletedItems] = useState([]);

  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control: poControl,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset: resetPO,
    formState: { isDirty: isPODirty },
  } = useForm({
    defaultValues: {
      po_date: moment().format("YYYY-MM-DD"),
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
    formState: { isDirty: isItemDirty },
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

  const { fields, append, remove, update } = useFieldArray({
    control: poControl,
    name: "items",
    rules: {
      required: !isEdit ? true : false,
    },
  });

  const {
    fields: addedItemsFields,
    append: appendAddedItems,
    remove: removeAddedItems,
  } = useFieldArray({
    control: poControl,
    name: "added_items",
  });

  const {
    fields: editedItemsFields,
    append: appendEditedItems,
    remove: removeEditedItems,
    update: updateEditedItems,
  } = useFieldArray({
    control: poControl,
    name: "edited_items",
  });

  useEffect(() => {
    if (poData) {
      setValue("po_date", moment(poData.po_date).format("YYYY-MM-DD"));
      setValue("id_company", poData.company);
      setValue("id_vendor", poData.vendor);
    }
  }, [poData, setValue]);

  useEffect(() => {
    setValue("sub_total", calculateTotal(fields.concat(addedItemsFields), "amount"));
    setValue("grand_total", watch("ppn") ? getValues("sub_total") * 1.11 : getValues("sub_total"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, getValues, watch("ppn"), fields, addedItemsFields]);

  useEffect(() => {
    if (editData && id_user) {
      const data = editData.data;
      if (id_user !== data.id_user) {
        redirect("/403");
      }
      resetPO({
        po_date: moment(data.po_date).format("YYYY-MM-DD"),
        id_company: data.company.id_company,
        id_vendor: data.vendor.id_vendor,
        id_user: data.id_user,
        notes: data.notes,
        sub_total: data.sub_total,
        ppn: parseFloat(data.ppn),
        grand_total: data.grand_total,
        items: data.items,
      });
    }
  }, [editData, resetPO, id_user]);

  const onPrev = () => {
    router.back();
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    resetItemForm();
    setEditIndex(null);
    setOpenForm(false);
  };

  const addItem = async (values) => {
    values = {
      ...values,
      id_po: idPO,
      amount: values.unit_price * values.qty,
    };
    if (!isEdit) {
      append(values);
    } else {
      appendAddedItems(values);
    }
    console.log(values);
    handleCloseForm();
  };

  const deleteItem = useCallback(
    async (item, index) => {
      if (item.id_po_item) {
        setDeletedItems((prev) => [...prev, item.id_po_item]);
        remove(index);
        removeEditedItems(item);
      } else {
        removeAddedItems(index - fields.length);
      }
    },
    [remove, removeAddedItems, removeEditedItems, fields.length]
  );

  const openEdit = useCallback(
    async (item, index) => {
      setEditIndex(index);
      resetItemForm(item, {
        keepDefaultValues: true,
      });
      handleOpenForm();
    },
    [resetItemForm]
  );

  const editItem = async (values) => {
    values = {
      ...values,
      amount: values.unit_price * values.qty,
    };
    console.log("editedItemsFields", editedItemsFields);
    if (editedItemsFields.some(({ id_po_item }) => id_po_item === values.id_po_item)) {
      updateEditedItems(editIndex, values);
      console.log("udpate");
    } else {
      appendEditedItems(values);
      console.log("append", values);
    }
    console.log(editIndex, values);
    update(editIndex, values);
    handleCloseForm();
  };

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    if (!isEdit) {
      values = {
        ...values,
        id_user: id_user,
      };
      delete values.added_items;
      delete values.edited_items;
    } else {
      values = {
        ...values,
        deleted_items: deletedItems,
      };
      delete values.items;
      console.log(values);
    }

    try {
      const res = !isEdit
        ? await API.post("/po", { data: values })
        : await API.patch(`/po/edit/${encodeURIComponent(idPO)}`, { data: values });
      !isEdit
        ? toast.success(`${res.data.message}
        ${res.data.id_po}`)
        : toast.success(`${res.data.message}`);
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
        <Button onClick={() => onPrev()}>Back</Button>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          {!isEdit ? "Add New Order Plan" : `Edit Order Plan: ${idPO}`}
        </Typography>
        {(company && vendor && poData) || editData ? (
          <>
            <POHeader
              company={!isEdit ? company.data : editData.data.company}
              vendor={!isEdit ? vendor.data : editData.data.vendor}
              po_date={!isEdit ? poData.po_date : editData.data.po_date}
              title="Order Planning"
              idPO={idPO}
            />
            <form>
              <Box sx={{ mt: 4, display: "flex", gap: 2, alignItems: "center" }}>
                <Typography variant="h2" sx={{ m: 0 }}>
                  Items
                </Typography>
                <Button variant="outlined" onClick={handleOpenForm}>
                  Add Item
                </Button>
              </Box>
              <ItemTable
                data={fields.concat(addedItemsFields)}
                onDelete={deleteItem}
                onEdit={openEdit}
              />
              <POFooter
                control={poControl}
                watch={{
                  sub_total: watch("sub_total"),
                  grand_total: watch("grand_total"),
                  ppn: watch("ppn"),
                }}
              />
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isPODirty || loading}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </>
        ) : (
          <POSkeleton />
        )}
      </Box>

      <DialogComp
        title={editIndex === null ? "Add Item" : "Edit Item"}
        open={openForm}
        onClose={handleCloseForm}
        actions={
          <>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button
              variant="contained"
              onClick={editIndex === null ? handleItem(addItem) : handleItem(editItem)}
              disabled={!isItemDirty}
            >
              {editIndex === null ? "Add" : "Edit"}
            </Button>
          </>
        }
      >
        <TextFieldCtrl
          control={itemControl}
          name="description"
          label="Description"
          rules={{
            required: "Field required",
          }}
        />
        <CurrencyField
          control={itemControl}
          name="unit_price"
          label="Unit Price"
          rules={{
            required: "Field required",
          }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
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
};
export default NewPO2;

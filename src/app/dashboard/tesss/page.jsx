"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, TextField, Autocomplete } from "@mui/material";

const MyForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      po: [
        { id: 1, name: "Item 1", description: "Description 1" },
        { id: 2, name: "Item 2", description: "Description 2" },
        { id: 3, name: "Item 3", description: "Description 3" },
      ],
      gr: [],
    },
  });

  // FieldArray for `po`
  const { fields: poItems, remove: removePoItem } = useFieldArray({
    control,
    name: "po",
  });

  // FieldArray for `gr`
  const { fields: grItems, append: appendGrItem } = useFieldArray({
    control,
    name: "gr",
  });

  const moveItem = (item, index) => {
    appendGrItem(item); // Add item to `gr`
    removePoItem(index); // Remove item from `po`
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>PO Items</h3>
      {poItems.map((item, index) => (
        <div key={item.id}>
          <TextField label="Name" value={item.name} variant="outlined" disabled fullWidth />
          <TextField
            label="Description"
            value={item.description}
            variant="outlined"
            disabled
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={() => moveItem(item, index)}>
            Add to GR
          </Button>
        </div>
      ))}

      <h3>GR Items</h3>
      {grItems.map((item, index) => (
        <div key={item.id}>
          <TextField label="Name" value={item.name} variant="outlined" disabled fullWidth />
          <TextField
            label="Description"
            value={item.description}
            variant="outlined"
            disabled
            fullWidth
          />
        </div>
      ))}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default MyForm;

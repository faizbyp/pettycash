"use client";

import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const TextFieldCtrl = ({ name, control, label, defaultValue = "", rules = {}, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          {...props}
        />
      )}
    />
  );
};

export default TextFieldCtrl;

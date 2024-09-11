"use client";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextFieldCtrl = ({
  control,
  label,
  name,
  rules,
  valueovr,
  readOnly,
  onChangeovr,
  toUpperCase,
  toLowerCase,
  numericInput,
  multiline,
  rows,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={valueovr}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
          <TextField
            autoComplete="on"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={(e) => {
              if (toUpperCase) {
                onChange(e.target.value.toUpperCase());
              } else if (toLowerCase) {
                onChange(e.target.value.toLowerCase());
              } else {
                onChange(e);
              }
            }}
            onBlur={(e) => {
              if (onChangeovr !== undefined) {
                onChangeovr(e.target.value);
              }
            }}
            inputRef={ref}
            value={value}
            label={label}
            variant="outlined"
            multiline={multiline}
            rows={rows}
            slotProps={{
              input: {
                readOnly: readOnly,
                inputMode: numericInput ? "numeric" : "text",
              },
            }}
            sx={{ mb: 2 }}
            fullWidth
          />
        )}
      />
    </>
  );
};

export default TextFieldCtrl;

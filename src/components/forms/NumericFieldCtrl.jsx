import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const NumericFieldCtrl = ({ name, control, label, defaultValue = "", rules = {}, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        ...rules,
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: "Please enter a valid number",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type="number"
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          {...props}
        />
      )}
    />
  );
};

export default NumericFieldCtrl;

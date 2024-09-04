import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const CurrencyField = ({ name, control, label, rules = {} }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        ...rules,
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: "Please enter a valid number",
        },
      }}
      render={({ field: { onChange, ref, value, ...rest } }) => (
        <NumericFormat
          {...rest}
          getInputRef={ref}
          value={value}
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          fullWidth
          label={label}
          variant="outlined"
          slotProps={{
            input: {
              min: 0,
            },
          }}
          onValueChange={(values) => {
            onChange(values.floatValue); // Ensure `onChange` gets a number
          }}
        />
      )}
    />
  );
};
export default CurrencyField;

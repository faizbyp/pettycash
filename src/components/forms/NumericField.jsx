import { Controller, Control } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { TextField, FormControl, FormHelperText, useTheme } from "@mui/material";
import { useMemo } from "react";

const HelperText = ({ message }) => {
  const theme = useTheme();
  const helperText = useMemo(() => {
    if (message !== undefined) {
      return message;
    }
    return "";
  }, [message]);
  return <FormHelperText sx={{ color: theme.palette.error.main }}>{helperText}</FormHelperText>;
};

export default function NumericFieldCtrl({
  name,
  label,
  control,
  rules,
  readOnly,
  disabled,
  min,
  max,
  type,
  onChangeOvr,
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <NumericFormat
              onChange={(e) => {
                if (onChangeOvr !== undefined) {
                  onChangeOvr(e.target.value);
                }
                onChange(e);
              }}
              value={value}
              label={label}
              inputRef={ref}
              customInput={TextField}
              error={!!error}
              fullWidth
              allowNegative={false}
              slotProps={{
                input: {
                  readOnly: readOnly,
                  disabled: disabled,
                  ...(type === "number" && {
                    type: "number",
                    min: min,
                    max: max,
                  }),
                },
              }}
            />
            <HelperText message={error?.message} />
          </FormControl>
        )}
      />
    </>
  );
}

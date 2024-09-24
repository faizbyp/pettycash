import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { Button, Box, Typography, FormHelperText } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const FileInput = ({ control, name, rules }) => {
  const inputRef = useRef(null); // Create a ref to the input

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <Box display="flex" alignItems="center">
            <input
              type="file"
              accept="image/*" // Change this based on the file types you want to allow
              onChange={(e) => {
                onChange(e.target.files[0]); // Set the file object
              }}
              onBlur={onBlur}
              ref={inputRef}
              style={{ display: "none" }} // Hide the default input
            />
            <Button
              variant="outlined"
              onClick={() => inputRef.current.click()} // Safely trigger the file input
              sx={{ marginRight: 1 }} // Add some spacing between button and text
              startIcon={<UploadFileIcon />}
            >
              Upload Invoice
            </Button>
            <Typography variant="body1" color={value ? "text.primary" : "text.secondary"}>
              {value ? value.name : "No file selected"}
            </Typography>
          </Box>
          {error && (
            <FormHelperText error>
              {error.message} {/* Display error message */}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default FileInput;

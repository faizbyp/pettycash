"use client";

import CheckboxCtrl from "@/components/forms/Checkbox";
import TextFieldCtrl from "@/components/forms/TextField";
import { formatThousand } from "@/helper/helper";
import {
  Box,
  Typography,
  Grid2 as Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const POFooter = ({ control, watch, notes, total }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        {control ? (
          <TextFieldCtrl multiline={true} rows={5} control={control} name="notes" label="Notes" />
        ) : (
          <TextField value={notes} multiline={true} rows={5} label="Notes" readOnly fullWidth />
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ display: "flex", gap: 16, justifyContent: "end" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography>Sub Total</Typography>
            <Typography>Grand Total</Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            {control && watch ? (
              <>
                <Typography>{formatThousand(watch.sub_total)}</Typography>
                <CheckboxCtrl name="ppn" control={control} label="PPN 11%" noMargin />
                <Typography>{formatThousand(watch.grand_total)}</Typography>
              </>
            ) : (
              <>
                <Typography>{formatThousand(total.sub_total)}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!total.ppn}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  }
                  label="PPN 11%"
                  sx={{ m: 0, color: !total.ppn && "silver" }}
                />
                <Typography>{formatThousand(total.grand_total)}</Typography>
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default POFooter;

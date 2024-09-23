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
  Paper,
} from "@mui/material";

const POFooter = ({ control, watch, notes, total }) => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          {control ? (
            <TextFieldCtrl multiline={true} rows={5} control={control} name="notes" label="Notes" />
          ) : (
            notes && (
              <TextField value={notes} multiline={true} rows={5} label="Notes" readOnly fullWidth />
            )
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ display: "flex", gap: 8, justifyContent: "end" }}>
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
      {!control && !watch && (
        <Grid container spacing={24} sx={{ mt: 8 }}>
          <Grid size={{ xs: 6 }}>
            <Paper
              sx={{
                height: "180px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography align="center">Prepared By</Typography>
              <Typography>Date:</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Paper
              sx={{
                height: "180px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography align="center">Authorized By</Typography>
              <Typography>Date:</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default POFooter;

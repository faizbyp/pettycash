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
  Link as MuiLink,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Link from "next/link";
import { memo } from "react";

const POFooter = memo(function POFooter({ control, watch, notes, total, GR, invoice }) {
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
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography>Sub Total</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  {control && watch ? (
                    <Typography>{formatThousand(watch.sub_total)}</Typography>
                  ) : (
                    <Typography>{formatThousand(total.sub_total)}</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {control && watch ? (
                    <CheckboxCtrl name="ppn" control={control} label="PPN 11%" />
                  ) : (
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
                      sx={{ color: !total.ppn && "silver" }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  {control && watch ? (
                    <Typography>
                      {watch.ppn ? formatThousand(watch.sub_total * 0.11) : "-"}
                    </Typography>
                  ) : (
                    <Typography>
                      {total.ppn ? formatThousand(total.sub_total * 0.11) : "-"}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Grand Total</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  {control && watch ? (
                    <Typography>{formatThousand(watch.grand_total)}</Typography>
                  ) : (
                    <Typography>{formatThousand(total.grand_total)}</Typography>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      {GR && (
        <Box sx={{ my: 2 }}>
          <Typography>Invoice No: {invoice.number}</Typography>
          <MuiLink
            href={`${process.env.NEXT_PUBLIC_APPURL}/static/invoice/${invoice.file}`}
            component={Link}
            target="_blank"
          >
            {invoice.file}
          </MuiLink>
        </Box>
      )}
      {!control && !watch && !GR && (
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
});

export default POFooter;

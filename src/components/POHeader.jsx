"use client";

import { Box, Typography, Grid2 as Grid, Divider } from "@mui/material";
import moment from "moment";
import { memo } from "react";

const POHeader = memo(function POHeader({ company, vendor, po_date, idPO, title }) {
  return (
    <>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>{company.company_name}</Typography>
          <Typography>{company.company_addr}</Typography>
          <Typography>Phone: {company.company_phone}</Typography>
          <Typography>Fax: {company.company_fax}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
          <Box sx={{ display: "flex", gap: 6 }}>
            {idPO && (
              <Box>
                <Typography>Number</Typography>
                <Typography>{idPO}</Typography>
              </Box>
            )}
            <Box>
              <Typography>Date</Typography>
              <Typography>{moment(po_date).format("DD/MM/YYYY")}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography>Vendor: {vendor.vendor_name}</Typography>
    </>
  );
});

export default POHeader;

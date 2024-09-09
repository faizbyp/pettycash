"use client";

import ItemTable from "@/components/ItemTable";
import useFetch from "@/hooks/useFetch";
import { Box, Skeleton, Typography, Grid2 as Grid, Divider } from "@mui/material";
import moment from "moment";

function PODetailPage({ params }) {
  const idPO = decodeURIComponent(params.idPO);
  const { data: po } = useFetch(`/po/${params.idPO}`);

  return (
    <Box>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        {idPO}
      </Typography>
      {po ? (
        <>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>{po.data.company.company_name}</Typography>
              <Typography>{po.data.company.company_addr}</Typography>
              <Typography>Phone: {po.data.company.company_phone}</Typography>
              <Typography>Fax: {po.data.company.company_fax}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Date</Typography>
              <Typography>{moment(po.data.po_date).format("DD/MM/YYYY")}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography>Vendor: {po.data.vendor.vendor_name}</Typography>
          <ItemTable data={po.data.items} />
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rounded" width="100%" height={64} />
          <Skeleton variant="rounded" width="100%" height={64} />
          <Skeleton variant="rounded" width="100%" height={64} />
        </Box>
      )}
    </Box>
  );
}
export default PODetailPage;

"use client";

import ItemTable from "@/components/ItemTable";
import POFooter from "@/components/POFooter";
import POHeader from "@/components/POHeader";
import useFetch from "@/hooks/useFetch";
import { Box, Skeleton, Typography } from "@mui/material";

function PODetailPage({ params }) {
  const idPO = decodeURIComponent(params.idPO);
  let { data: po } = useFetch(`/po/${params.idPO}`);

  return (
    <Box>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        {idPO}
      </Typography>
      {po ? (
        <>
          <POHeader
            company={po.data.company}
            vendor={po.data.vendor}
            idPO={idPO}
            po_date={po.data.po_date}
          />
          <ItemTable data={po.data.items} />
          <POFooter
            notes={po.data.notes}
            total={{
              sub_total: po.data.sub_total,
              ppn: parseFloat(po.data.ppn),
              grand_total: po.data.grand_total,
            }}
          />
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

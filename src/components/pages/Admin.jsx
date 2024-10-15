"use client";

import POTable from "@/components/POTable";
import { Typography, Box, Skeleton, Grid2 as Grid, IconButton } from "@mui/material";
import useSWR from "swr";
import { TableSkeleton } from "../Skeleton";
import { PieChart, BarChart, blueberryTwilightPaletteLight } from "@mui/x-charts";
import { useEffect, useState } from "react";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import GRTable from "../GRTable";
import { formatThousand } from "@/helper/helper";

const Admin = () => {
  const { data: po } = useSWR(`/po`);
  const { data: gr } = useSWR(`/gr`);

  const wrapLabel = (label) => {
    const words = label.split(" ");
    return words.length > 1 ? words.join("\n") : label;
  };

  const poTableAction = (row) => (
    <Link href={`/dashboard/approval/${encodeURIComponent(row.id_po)}`} passHref>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Link>
  );

  const grTableAction = (row) => (
    <Link href={`/dashboard/gr/${encodeURIComponent(row.id_gr)}`} passHref>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Link>
  );

  return (
    <Box component="main">
      <Typography variant="h1">Admin Dashboard</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ color: "primary.main" }}>
          <Typography variant="h2">Petty Cash Spent</Typography>
          <Typography variant="display">
            {gr && `Rp${formatThousand(gr.money_spent.sum)}`}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "primary.main" }}>
            Companies with the Most Order
          </Typography>
          {po ? (
            <BarChart
              colors={blueberryTwilightPaletteLight}
              xAxis={[
                {
                  scaleType: "band",
                  data: po.company_count.map((company) => wrapLabel(company.company_name)),
                },
              ]}
              series={[
                {
                  data: po.company_count.map((company) => company.company_count),
                  label: "Order Plan",
                },
                {
                  data: gr.company_count.map((company) => company.company_count),
                  label: "Order Confirmation",
                },
              ]}
              margin={{ bottom: 100 }}
              width={600}
              height={350}
            />
          ) : (
            <Skeleton variant="rounded" width={500} height={300} />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "primary.main" }}>
            Order Plan Status
          </Typography>
          {po ? (
            <PieChart
              colors={["orange", "red", "green"]}
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: po.status_count?.pending || 0,
                      label: "Pending",
                      color: "orange",
                    },
                    {
                      id: 1,
                      value: po.status_count?.approved || 0,
                      label: "Approved",
                      color: "green",
                    },
                    {
                      id: 2,
                      value: po.status_count?.rejected || 0,
                      label: "Rejected",
                      color: "red",
                    },
                  ],
                },
              ]}
              width={450}
              height={250}
            />
          ) : (
            <Skeleton variant="circular" width={300} height={300} />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "primary.main" }}>
            Order Confirmation Status
          </Typography>
          {gr ? (
            <PieChart
              colors={["orange", "red", "green"]}
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: gr.status_count?.pending || 0,
                      label: "Pending",
                      color: "orange",
                    },
                    {
                      id: 1,
                      value: gr.status_count?.approved || 0,
                      label: "Approved",
                      color: "green",
                    },
                    {
                      id: 2,
                      value: gr.status_count?.rejected || 0,
                      label: "Rejected",
                      color: "red",
                    },
                  ],
                },
              ]}
              width={450}
              height={250}
            />
          ) : (
            <Skeleton variant="circular" width={300} height={300} />
          )}
        </Grid>
      </Grid>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Order Planning
      </Typography>
      {po ? <POTable data={po.data} admin actions={poTableAction} /> : <TableSkeleton column={8} />}
      <Typography variant="h1" sx={{ color: "primary.main", mt: 2 }}>
        Order Confirmation
      </Typography>
      {gr ? <GRTable data={gr.data} admin actions={grTableAction} /> : <TableSkeleton column={8} />}
    </Box>
  );
};
export default Admin;

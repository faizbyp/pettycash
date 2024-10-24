"use client";

import { Typography, Skeleton, Grid2 as Grid, Tooltip } from "@mui/material";
import { PieChart, BarChart, blueberryTwilightPaletteLight } from "@mui/x-charts";
import { formatThousand } from "@/helper/helper";
import { memo } from "react";

const ReportCharts = memo(function ReportCharts({
  amount,
  poCompanyCount,
  grCompanyCount,
  poStatusCount,
  grStatusCount,
}) {
  const wrapLabel = (label) => {
    const words = label.split(" ");
    return words.length > 1 ? words.join("\n") : label;
  };

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, md: 6 }} sx={{ color: "primary.main" }}>
        <Typography variant="h2">Petty Cash Spent</Typography>
        <Tooltip title="Sum of approved Order Confirmation grand total">
          <Typography variant="display">{amount && `Rp${formatThousand(amount)}`}</Typography>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h2" sx={{ color: "primary.main" }}>
          Companies Orders
        </Typography>
        {poCompanyCount && grCompanyCount ? (
          <BarChart
            colors={blueberryTwilightPaletteLight}
            xAxis={[
              {
                scaleType: "band",
                data: poCompanyCount.map((company) => wrapLabel(company.company_name)),
              },
            ]}
            series={[
              {
                data: poCompanyCount.map((company) => company.company_count),
                label: "Order Plan",
              },
              {
                data: grCompanyCount.map((company) => company.company_count),
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
        {poStatusCount ? (
          <PieChart
            colors={["orange", "red", "green"]}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: poStatusCount.pending || 0,
                    label: "Pending",
                    color: "orange",
                  },
                  {
                    id: 1,
                    value: poStatusCount.approved || 0,
                    label: "Approved",
                    color: "green",
                  },
                  {
                    id: 2,
                    value: poStatusCount.rejected || 0,
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
        {grStatusCount ? (
          <PieChart
            colors={["orange", "red", "green"]}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: grStatusCount.pending || 0,
                    label: "Pending",
                    color: "orange",
                  },
                  {
                    id: 1,
                    value: grStatusCount.approved || 0,
                    label: "Approved",
                    color: "green",
                  },
                  {
                    id: 2,
                    value: grStatusCount.rejected || 0,
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
  );
});
export default ReportCharts;

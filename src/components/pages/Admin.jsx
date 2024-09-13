"use client";

import POTable from "@/components/POTable";
import { Typography, Box, Skeleton, Grid2 as Grid } from "@mui/material";
import useSWR from "swr";
import { TableSkeleton } from "../Skeleton";
import { PieChart, BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

const Admin = () => {
  const { data: po } = useSWR(`/po`);
  const [companyNames, setCompanyNames] = useState([]);
  const [companyCounts, setCompanyCounts] = useState([]);

  useEffect(() => {
    let companyCount = {};
    if (po) {
      po.data.map((item) => {
        const company = item.company_name;
        companyCount[company] = (companyCount[company] || 0) + 1;
      });

      setCompanyNames(Object.keys(companyCount));
      setCompanyCounts(Object.values(companyCount));
    }
  }, [po]);

  const wrapLabel = (label) => {
    const words = label.split(" ");
    return words.length > 1 ? words.join("\n") : label;
  };

  return (
    <Box component="main">
      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h1" sx={{ color: "primary.main" }}>
            PO Status
          </Typography>
          {po ? (
            <PieChart
              colors={["orange", "red", "green"]}
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: po.data.filter((item) => item.status === "pending").length,
                      label: "Pending",
                      color: "orange",
                    },
                    {
                      id: 1,
                      value: po.data.filter((item) => item.status === "approved").length,
                      label: "Approved",
                      color: "green",
                    },
                    {
                      id: 2,
                      value: po.data.filter((item) => item.status === "rejected").length,
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
          <Typography variant="h1" sx={{ color: "primary.main" }}>
            Company PO Count
          </Typography>
          {po && companyNames && companyCounts ? (
            <BarChart
              xAxis={[{ scaleType: "band", data: companyNames.map((label) => wrapLabel(label)) }]}
              series={[{ data: companyCounts }]}
              margin={{ bottom: 100 }}
              width={500}
              height={350}
            />
          ) : (
            <Skeleton variant="rounded" width={500} height={300} />
          )}
        </Grid>
      </Grid>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Purchase Orders
      </Typography>
      {po ? <POTable data={po.data} admin /> : <TableSkeleton column={8} />}
    </Box>
  );
};
export default Admin;

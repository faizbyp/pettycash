"use client";

import POTable from "@/components/POTable";
import { Typography, Box, Skeleton, Grid2 as Grid, IconButton } from "@mui/material";
import useSWR, { SWRConfig } from "swr";
import { TableSkeleton } from "../Skeleton";
import { PieChart, BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import useAPI from "@/hooks/useAPI";

const Admin = () => {
  const API = useAPI();
  const fetcher = (url) => API.get(url).then((res) => res.data);
  const { data: po } = useSWR(`/po`, fetcher);
  const [companyNames, setCompanyNames] = useState([]);
  const [companyCounts, setCompanyCounts] = useState([]);

  useEffect(() => {
    let companyCount = {};
    if (po) {
      po.data.forEach((item) => {
        const company = item.company_name;
        companyCount[company] = (companyCount[company] || 0) + 1;
      });

      // Create an array of [company, count] pairs
      const sortedCompanies = Object.entries(companyCount).sort(
        ([, countA], [, countB]) => countB - countA
      );

      // Separate the sorted names and counts
      const sortedCompanyNames = sortedCompanies.map(([company]) => company).slice(0, 5);
      const sortedCompanyCounts = sortedCompanies.map(([, count]) => count).slice(0, 5);

      setCompanyNames(sortedCompanyNames);
      setCompanyCounts(sortedCompanyCounts);
    }
  }, [po]);

  const wrapLabel = (label) => {
    const words = label.split(" ");
    return words.length > 1 ? words.join("\n") : label;
  };

  const tableAction = (row) => (
    <Link href={`/admin/approval/${encodeURIComponent(row.id_po)}`} passHref>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Link>
  );

  return (
    <Box component="main">
      <Typography variant="h1">Admin Dashboard</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
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
          <Typography variant="h2" sx={{ color: "primary.main" }}>
            Companies with the Most Order Plans
          </Typography>
          {po && companyNames && companyCounts ? (
            <BarChart
              xAxis={[{ scaleType: "band", data: companyNames.map((label) => wrapLabel(label)) }]}
              series={[{ data: companyCounts }]}
              margin={{ bottom: 100 }}
              width={600}
              height={350}
            />
          ) : (
            <Skeleton variant="rounded" width={500} height={300} />
          )}
        </Grid>
      </Grid>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Order Planning
      </Typography>
      {po ? <POTable data={po.data} admin actions={tableAction} /> : <TableSkeleton column={8} />}
    </Box>
  );
};
export default Admin;

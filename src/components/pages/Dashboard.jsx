"use client";

import { Typography, Skeleton, Box, Grid2 as Grid } from "@mui/material";
import MyPO from "@/components/pages/po/MyPO";
import { PieChart } from "@mui/x-charts";
import useFetch from "@/hooks/useFetch";
import MyGR from "./gr/MyGR";
import ReportCharts from "../ReportCharts";
import useAuthStore from "@/hooks/useAuthStore";

const Dashboard = () => {
  const name = useAuthStore((state) => state.name);
  const { data: chart } = useFetch("/report/chart");

  return (
    <>
      <Typography variant="display">
        {name ? `Welcome! ${name}` : <Skeleton variant="rounded" width={256} height={64} />}
      </Typography>
      <ReportCharts
        amount={chart?.data.money_spent.sum}
        companyTotal={chart?.data.company_total}
        poStatusCount={chart?.data.po_status}
        grStatusCount={chart?.data.gr_status}
      />
      <MyPO />
      <MyGR />
    </>
  );
};
export default Dashboard;

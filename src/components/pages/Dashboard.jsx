"use client";

import { useSessionData } from "@/components/dashboard/PersistentDrawer";
import { Typography, Skeleton, Box, Grid2 as Grid } from "@mui/material";
import MyPO from "@/components/pages/po/MyPO";
import { PieChart } from "@mui/x-charts";
import useFetch from "@/hooks/useFetch";
import MyGR from "./gr/MyGR";
import ReportCharts from "../ReportCharts";

const Dashboard = () => {
  const sessionData = useSessionData();
  const { data: po } = useFetch(sessionData ? `/po/user/${sessionData.id_user}` : null);
  const { data: chart } = useFetch("/report/chart");

  return (
    <>
      <Typography variant="display">
        {sessionData ? (
          `Welcome! ${sessionData.name}`
        ) : (
          <Skeleton variant="rounded" width={256} height={64} />
        )}
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

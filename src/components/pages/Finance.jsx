import useFetch from "@/hooks/useFetch";
import Reports from "./Reports";
import ReportCharts from "../ReportCharts";
import { Box, Typography } from "@mui/material";

const Finance = () => {
  const { data: po } = useFetch("/po");
  const { data: gr } = useFetch("/gr");
  return (
    <Box component="main">
      <Typography variant="h1">Finance Dashboard</Typography>
      <ReportCharts
        amount={gr?.money_spent.sum}
        companyCount={po?.company_count}
        poStatusCount={po?.status_count}
        grStatusCount={gr?.status_count}
      />
      <Reports />
    </Box>
  );
};
export default Finance;

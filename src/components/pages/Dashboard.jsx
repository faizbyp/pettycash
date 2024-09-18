"use client";

import { useSessionData } from "@/components/PersistentDrawer";
import { Typography, Skeleton, Box, Grid2 as Grid } from "@mui/material";
import MyPO from "@/components/pages/MyPO";
import { PieChart } from "@mui/x-charts";
import useFetch from "@/hooks/useFetch";

const Dashboard = () => {
  const sessionData = useSessionData();
  console.log(sessionData);
  const { data: po } = useFetch(sessionData ? `/po/user/${sessionData.id_user}` : null);

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="display">Welcome!</Typography>
          <Typography variant="display" sx={{ color: "primary.main" }}>
            {sessionData ? (
              sessionData.name
            ) : (
              <Skeleton variant="rounded" width={256} height={64} />
            )}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "primary.main" }}>
            My Order Plan Status
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
      </Grid>
      <MyPO />
    </>
  );
};
export default Dashboard;

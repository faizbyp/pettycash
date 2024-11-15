"use client";

import Admin from "@/components/pages/Admin";
import Dashboard from "@/components/pages/Dashboard";
import Finance from "@/components/pages/Finance";
import useAuthStore from "@/hooks/useAuthStore";
import Forbidden from "../pages/Forbidden";

const DashboardSelect = () => {
  const id_role = useAuthStore((state) => state.id_role);

  switch (id_role) {
    case process.env.NEXT_PUBLIC_ADMIN_ID:
      return <Admin />;
    case process.env.NEXT_PUBLIC_USER_ID:
      return <Dashboard />;
    case process.env.NEXT_PUBLIC_FINANCE_ID:
      return <Finance />;
    default:
      console.error("NO ID_ROLE");
      return <Forbidden />;
  }
};
export default DashboardSelect;

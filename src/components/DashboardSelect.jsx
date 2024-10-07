"use client";

import Admin from "@/components/pages/Admin";
import Dashboard from "@/components/pages/Dashboard";
import Reports from "@/components/pages/Reports";
import { getSession, useSession } from "next-auth/react";

const DashboardSelect = () => {
  const { data: session } = useSession();

  if (!session) return null;

  switch (session?.user?.id_role) {
    case process.env.NEXT_PUBLIC_ADMIN_ID:
      return <Admin />;
    case process.env.NEXT_PUBLIC_USER_ID:
      return <Dashboard />;
    case process.env.NEXT_PUBLIC_FINANCE_ID:
      return <Reports />;
    default:
      console.error("NO ID_ROLE");
      return <Dashboard />;
  }
};
export default DashboardSelect;

import PersistentDrawer from "@/components/dashboard/PersistentDrawer";
import DashboardMenu from "@/components/dashboard/DashboardMenu";

export const metadata = {
  title: "Dashboard - Petty Cash KPN",
};

export default function DashboardLayout({ children }) {
  return (
    <PersistentDrawer title="Petty Cash KPN" menu={<DashboardMenu />}>
      {children}
    </PersistentDrawer>
  );
}

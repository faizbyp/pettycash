import PersistentDrawer from "@/components/PersistentDrawer";
import HomeIcon from "@mui/icons-material/Home";

export const metadata = {
  title: "Admin Dashboard",
};

export default function DashboardLayout({ children }) {
  const menu = [
    {
      name: "Admin",
      url: "/admin",
      icon: <HomeIcon />,
    },
  ];

  return (
    <PersistentDrawer title="Admin - Petty Cash KPN" menu={menu}>
      {children}
    </PersistentDrawer>
  );
}

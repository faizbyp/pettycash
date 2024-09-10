import PersistentDrawer from "@/components/PersistentDrawer";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";

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
    {
      name: "Vendor",
      url: "/admin/vendor",
      icon: <StoreIcon />,
    },
  ];

  return (
    <PersistentDrawer title="Admin - Petty Cash KPN" menu={menu}>
      {children}
    </PersistentDrawer>
  );
}

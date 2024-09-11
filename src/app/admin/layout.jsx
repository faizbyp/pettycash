import PersistentDrawer from "@/components/PersistentDrawer";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import BusinessIcon from "@mui/icons-material/Business";

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
    {
      name: "Company",
      url: "/admin/company",
      icon: <BusinessIcon />,
    },
  ];

  return (
    <PersistentDrawer title="Admin - Petty Cash KPN" menu={menu}>
      {children}
    </PersistentDrawer>
  );
}

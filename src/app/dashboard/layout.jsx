import PersistentDrawer from "@/components/PersistentDrawer";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export const metadata = {
  title: "Dashboard - Petty Cash KPN",
};

export default function DashboardLayout({ children }) {
  const menu = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      name: "Add Order Planning",
      url: "/dashboard/my-po/new",
      icon: <AddCircleIcon />,
    },
    {
      name: "Create Order Confirmation",
      url: "/dashboard/gr",
      icon: <AddCircleIcon />,
    },
  ];

  return (
    <PersistentDrawer title="Petty Cash KPN" menu={menu}>
      {children}
    </PersistentDrawer>
  );
}

import PersistentDrawer from "@/components/PersistentDrawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  const menu = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      name: "My PO",
      url: "/dashboard/my-po",
      icon: <ContactPageIcon />,
    },
    {
      name: "Request PO",
      url: "/dashboard/my-po/new",
      icon: <AddCircleIcon />,
    },
  ];

  return (
    <PersistentDrawer title="Petty Cash KPN" menu={menu}>
      {children}
    </PersistentDrawer>
  );
}

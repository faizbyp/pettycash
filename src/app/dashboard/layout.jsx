import PersistentDrawer from "@/components/PersistentDrawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  const menu = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <InboxIcon />,
    },
    {
      name: "Request PO",
      url: "/dashboard/request",
      icon: <InboxIcon />,
    },
    {
      name: "Item List",
      url: "/dashboard/item",
      icon: <InboxIcon />,
    },
  ];

  return (
    <PersistentDrawer title={metadata.title} menu={menu}>
      {children}
    </PersistentDrawer>
  );
}

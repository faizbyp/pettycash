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
      url: "/dashboard/my-po/new",
      icon: <InboxIcon />,
    },
  ];

  return (
    <PersistentDrawer title="Petty Cash KPN" menu={menu}>
      {children}
    </PersistentDrawer>
  );
}

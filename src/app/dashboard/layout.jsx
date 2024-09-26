import PersistentDrawer from "@/components/PersistentDrawer";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Link from "next/link";

export const metadata = {
  title: "Dashboard - Petty Cash KPN",
};

const DashboardMenu = () => {
  return (
    <>
      <List>
        <ListItem disablePadding>
          <Link href="/dashboard" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <List subheader={<ListSubheader>Order Plan</ListSubheader>}>
        <ListItem disablePadding>
          <Link href="/dashboard/my-po/new" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add Order Planning" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <List subheader={<ListSubheader>Order Confirmation</ListSubheader>}>
        <ListItem disablePadding>
          <Link href="/dashboard/gr" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Create Order Confirmation" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </>
  );
};

export default function DashboardLayout({ children }) {
  return (
    <PersistentDrawer title="Petty Cash KPN" menu={<DashboardMenu />}>
      {children}
    </PersistentDrawer>
  );
}

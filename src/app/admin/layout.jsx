import PersistentDrawer from "@/components/dashboard/PersistentDrawer";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import BusinessIcon from "@mui/icons-material/Business";
import ScaleIcon from "@mui/icons-material/Scale";
import ArticleIcon from "@mui/icons-material/Article";
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
  title: "Admin Dashboard",
};

const AdminMenu = () => {
  return (
    <>
      <List>
        <ListItem disablePadding>
          <Link href="/admin" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <List subheader={<ListSubheader>Master Data</ListSubheader>}>
        <ListItem disablePadding>
          <Link href="/admin/vendor" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Vendor" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/admin/company" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Company" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/admin/uom" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <ScaleIcon />
              </ListItemIcon>
              <ListItemText primary="UOM" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <List subheader={<ListSubheader>Reports</ListSubheader>}>
        <ListItem disablePadding>
          <Link href="/admin/reports" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </>
  );
};

export default function DashboardLayout({ children }) {
  return (
    <PersistentDrawer title="Admin - Petty Cash KPN" menu={<AdminMenu />}>
      {children}
    </PersistentDrawer>
  );
}

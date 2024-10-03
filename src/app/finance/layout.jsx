import PersistentDrawer from "@/components/PersistentDrawer";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DescriptionIcon from "@mui/icons-material/Description";
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
  title: "Finance Dashboard - Petty Cash KPN",
};

const FinanceMenu = () => {
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
          <Link href="/dashboard/my-po" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="My Order Planning" />
            </ListItemButton>
          </Link>
        </ListItem>
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
          <Link href="/dashboard/my-gr" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <RequestQuoteIcon />
              </ListItemIcon>
              <ListItemText primary="My Order Confirmation" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/dashboard/my-gr/new" passHref legacyBehavior>
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

export default function FinanceLayout({ children }) {
  return (
    <PersistentDrawer title="Finance - Petty Cash KPN" menu={<FinanceMenu />}>
      {children}
    </PersistentDrawer>
  );
}

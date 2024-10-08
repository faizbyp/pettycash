import PersistentDrawer from "@/components/dashboard/PersistentDrawer";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DescriptionIcon from "@mui/icons-material/Description";
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
  title: "Finance Dashboard - Petty Cash KPN",
};

const FinanceMenu = () => {
  return (
    <>
      <List subheader={<ListSubheader>Reports</ListSubheader>}>
        <ListItem disablePadding>
          <Link href="/finance/reports" passHref legacyBehavior>
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

export default function FinanceLayout({ children }) {
  return (
    <PersistentDrawer title="Finance - Petty Cash KPN" menu={<FinanceMenu />}>
      {children}
    </PersistentDrawer>
  );
}

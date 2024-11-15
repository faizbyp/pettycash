"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SubjectIcon from "@mui/icons-material/Subject";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PolicyIcon from "@mui/icons-material/Policy";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ListIcon from "@mui/icons-material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DescriptionIcon from "@mui/icons-material/Description";
import StoreIcon from "@mui/icons-material/Store";
import ScaleIcon from "@mui/icons-material/Scale";
import ArticleIcon from "@mui/icons-material/Article";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { AppBar, IconButton, ListSubheader, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import UserMenu from "../UserMenu";
import useAuthStore from "@/hooks/useAuthStore";
import Link from "next/link";

const drawerWidth = 240;

const items = [
  {
    items: [{ name: "Admin", link: "/admin", icon: <HomeIcon /> }],
  },
  {
    subheader: "Master Data",
    items: [
      { name: "Business Unit", link: "/admin/bu", icon: <BusinessIcon /> },
      { name: "Terms & PP", link: "/admin/terms-pp", icon: <PolicyIcon /> },
      { name: "Short Brief", link: "/admin/short-brief", icon: <SubjectIcon /> },
      { name: "Series", link: "/admin/series", icon: <QuestionAnswerIcon /> },
      { name: "Criteria", link: "/admin/criteria", icon: <SportsScoreIcon /> },
      { name: "Function Menu", link: "/admin/function-menu", icon: <ListIcon /> },
    ],
  },
];

const admin = [
  {
    items: [{ name: "Admin", link: "/dashboard", icon: <HomeIcon /> }],
  },
  {
    items: [{ name: "Reports", link: "/dashboard/reports", icon: <ArticleIcon /> }],
  },
  {
    subheader: "Order Plan",
    items: [
      { name: "My Order Planning", link: "/dashboard/my-po", icon: <DescriptionIcon /> },
      { name: "Add Order Planning", link: "/dashboard/my-po/new", icon: <AddCircleIcon /> },
      { name: "Cancel Request", link: "/dashboard/cancel-request", icon: <CancelIcon /> },
    ],
  },
  {
    subheader: "Order Confirmation",
    items: [
      { name: "My Order Confirmation", link: "/dashboard/my-gr", icon: <RequestQuoteIcon /> },
      {
        name: "Create Order Confirmation",
        link: "/dashboard/my-gr/new",
        icon: <AddCircleIcon />,
      },
    ],
  },
  {
    subheader: "Master Data",
    items: [
      { name: "Vendor", link: "/dashboard/vendor", icon: <StoreIcon /> },
      {
        name: "Company",
        link: "/dashboard/company",
        icon: <BusinessIcon />,
      },
      {
        name: "UOM",
        link: "/dashboard/uom",
        icon: <ScaleIcon />,
      },
    ],
  },
];

const user = [
  {
    items: [{ name: "Dashboard", link: "/dashboard", icon: <HomeIcon /> }],
  },
  {
    subheader: "Order Plan",
    items: [
      { name: "My Order Planning", link: "/dashboard/my-po", icon: <DescriptionIcon /> },
      { name: "Add Order Planning", link: "/dashboard/my-po/new", icon: <AddCircleIcon /> },
    ],
  },
  {
    subheader: "Order Confirmation",
    items: [
      { name: "My Order Confirmation", link: "/dashboard/my-gr", icon: <RequestQuoteIcon /> },
      {
        name: "Create Order Confirmation",
        link: "/dashboard/my-gr/new",
        icon: <AddCircleIcon />,
      },
    ],
  },
  {
    subheader: "Master Data",
    items: [
      { name: "Vendor", link: "/dashboard/vendor", icon: <StoreIcon /> },
      {
        name: "Company",
        link: "/dashboard/company",
        icon: <BusinessIcon />,
      },
      {
        name: "UOM",
        link: "/dashboard/uom",
        icon: <ScaleIcon />,
      },
    ],
  },
];
const finance = [
  {
    items: [{ name: "Home", link: "/dashboard", icon: <HomeIcon /> }],
  },
  {
    subheader: "Reports",
    items: [{ name: "Reports", link: "/dashboard/reports", icon: <ArticleIcon /> }],
  },
];

export default function PersistentDrawer({ children }) {
  const id_role = useAuthStore((state) => state.id_role);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  // PROTECT ROUTES INSIDE ADMIN LAYOUT
  useEffect(() => {
    const authStorage = localStorage.getItem("auth-storage");
    if (!authStorage) {
      router.replace("/login");
    }
  }, [router]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  let items = [];
  switch (id_role) {
    case process.env.NEXT_PUBLIC_ADMIN_ID:
      items = admin;
      break;
    case process.env.NEXT_PUBLIC_USER_ID:
      items = user;
      break;
    case process.env.NEXT_PUBLIC_FINANCE_ID:
      items = finance;
      break;
    default:
      items = user;
  }

  const DrawerList = (
    <List>
      {items.map((menuGroup, index) => (
        <List
          dense
          subheader={
            menuGroup.subheader && (
              <ListSubheader color="primary">{menuGroup.subheader}</ListSubheader>
            )
          }
          key={index}
        >
          {menuGroup.items.map((item) => (
            <ListItem disablePadding key={item.name}>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Petty Cash KPN
            </Typography>
          </Box>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ overflow: "auto" }}>{DrawerList}</Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: open ? 0 : `-${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Box sx={{ width: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}

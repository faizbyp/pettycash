"use client";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DescriptionIcon from "@mui/icons-material/Description";
import StoreIcon from "@mui/icons-material/Store";
import BusinessIcon from "@mui/icons-material/Business";
import ScaleIcon from "@mui/icons-material/Scale";
import ArticleIcon from "@mui/icons-material/Article";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";

const menuItems = {
  admin: [
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
  ],
  user: [
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
  ],
  finance: [
    {
      items: [{ name: "Home", link: "/dashboard", icon: <HomeIcon /> }],
    },
    {
      subheader: "Reports",
      items: [{ name: "Reports", link: "/dashboard/reports", icon: <ArticleIcon /> }],
    },
  ],
};

function getMenuItems(role) {
  return menuItems[role] || [];
}

const DashboardMenu = () => {
  const { data: session, status } = useSession();

  let role;
  switch (session?.user?.id_role) {
    case process.env.NEXT_PUBLIC_ADMIN_ID:
      role = "admin";
      break;
    case process.env.NEXT_PUBLIC_USER_ID:
      role = "user";
      break;
    case process.env.NEXT_PUBLIC_FINANCE_ID:
      role = "finance";
      break;
    default:
      role = "user";
  }

  const items = getMenuItems(role);

  if (status === "loading")
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {items &&
        items.map((menuGroup, index) => (
          <List
            subheader={
              menuGroup.subheader && (
                <ListSubheader color="primary">{menuGroup.subheader}</ListSubheader>
              )
            }
            key={index}
          >
            {menuGroup.items.map((item) => (
              <ListItem disablePadding key={item.name}>
                <Link href={item.link} passHref legacyBehavior>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        ))}
    </>
  );
};

export default DashboardMenu;

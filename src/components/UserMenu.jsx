"use client";
import useAuthStore from "@/hooks/useAuthStore";
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

const UserMenu = () => {
  const name = useAuthStore((state) => state.name);
  const signOut = useAuthStore((state) => state.signOut);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("logout");
    signOut();
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
      >
        <MenuItem sx={{ width: "10rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton>
              <Avatar>{name.slice(0, 1).toUpperCase()}</Avatar>
            </IconButton>
            <Typography>{name}</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ width: "10rem" }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default UserMenu;

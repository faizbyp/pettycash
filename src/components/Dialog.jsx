"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";

const DialogComp = ({ title, actions, open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-modal="true" fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default DialogComp;

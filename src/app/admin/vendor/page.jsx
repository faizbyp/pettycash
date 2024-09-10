"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import useFetch from "@/hooks/useFetch";

function VendorPage() {
  const { data: vendors } = useFetch("/vendor");

  return (
    <>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Vendors
      </Typography>
      {vendors ? (
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="PO Table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.data.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id_vendor}
                  </TableCell>
                  <TableCell>{row.vendor_name}</TableCell>
                  <TableCell>{row.vendor_addr}</TableCell>
                  <TableCell>
                    <Chip
                      color={row.is_active === true ? "success" : "error"}
                      label={row.is_active === true ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Skeleton variant="rounded" width="100%" height={64} />
      )}
    </>
  );
}
export default VendorPage;

"use client";

import API from "@/services/api";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  listItemSecondaryActionClasses,
  Typography,
} from "@mui/material";
import useSWR from "swr";

function ItemPage() {
  const { data: item, error, isLoading } = useSWR("/item", { fallback: { url: [] } });
  console.log(item);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="Item Table">
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              item.data.map((row) => (
                <TableRow hover key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.id_item}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.uom}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default ItemPage;

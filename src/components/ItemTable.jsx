import { formatThousand } from "@/helper/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo } from "react";

const ItemTable = memo(function ItemTable({ data, onDelete, GR }) {
  console.log("item table", data);
  return (
    <TableContainer
      component={Paper}
      sx={{ mb: 4, maxWidth: "92vw", overflow: "scroll", maxHeight: 440 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>UOM</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            {GR && (
              <>
                <TableCell>Notes</TableCell>
                <TableCell>Completed</TableCell>
              </>
            )}
            {onDelete && <TableCell align="right">Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>{item.uom}</TableCell>
              <TableCell align="right">{formatThousand(item.unit_price)}</TableCell>
              <TableCell align="right">{formatThousand(item.amount)}</TableCell>
              {GR && (
                <>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={item.is_complete}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </TableCell>
                </>
              )}
              {/* check this */}
              {onDelete && (
                <TableCell align="right">
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item, index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ItemTable;

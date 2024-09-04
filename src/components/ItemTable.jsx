import { formatThousand } from "@/helper/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ItemTable = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>UOM</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Amount</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;

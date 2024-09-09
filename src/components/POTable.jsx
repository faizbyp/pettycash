import { formatThousand } from "@/helper/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import moment from "moment";

const statusColor = (status) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "error";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

const POTable = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID PO</TableCell>
            <TableCell>PO Date</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell align="right">Grand Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {item.id_po}
              </TableCell>
              <TableCell>{moment(item.po_date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{item.company_name}</TableCell>
              <TableCell>{item.vendor_name}</TableCell>
              <TableCell align="right">{formatThousand(item.grand_total)}</TableCell>
              <TableCell>
                <Chip color={statusColor(item.status)} label={item.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default POTable;

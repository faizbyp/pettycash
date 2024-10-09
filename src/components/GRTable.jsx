import { formatThousand, statusColor } from "@/helper/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";

const GRTable = ({ data, admin, actions }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "92vw", overflow: "scroll", maxHeight: 440 }}>
      <Table stickyHeader aria-label="GR Table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                color: "white",
                backgroundColor: "primary.main",
              },
            }}
          >
            <TableCell>ID Conf.</TableCell>
            <TableCell>ID Plan</TableCell>
            {admin && <TableCell>Req By</TableCell>}
            <TableCell>Conf. Date</TableCell>
            <TableCell>Plan Date</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell align="right">Grand Total</TableCell>
            <TableCell>Status</TableCell>
            {actions && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow hover key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.id_gr}
              </TableCell>
              <TableCell>{row.id_po}</TableCell>
              {admin && <TableCell>{row.user_name}</TableCell>}
              <TableCell>{moment(row.gr_date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{moment(row.po_date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{row.company_name}</TableCell>
              <TableCell>{row.vendor_name}</TableCell>
              <TableCell align="right">{formatThousand(row.grand_total)}</TableCell>
              <TableCell>
                <Chip color={statusColor(row.status)} label={row.status} />
              </TableCell>
              {actions && <TableCell align="right">{actions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GRTable;

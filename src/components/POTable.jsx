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

const POTable = ({ data, admin }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="PO Table">
        <TableHead>
          <TableRow>
            <TableCell>ID PO</TableCell>
            <TableCell>PO Date</TableCell>
            {admin && <TableCell>Req By</TableCell>}
            <TableCell>Company</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell align="right">Grand Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow hover key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.id_po}
              </TableCell>
              <TableCell>{moment(row.po_date).format("DD/MM/YYYY")}</TableCell>
              {admin && <TableCell>{row.user_name}</TableCell>}
              <TableCell>{row.company_name}</TableCell>
              <TableCell>{row.vendor_name}</TableCell>
              <TableCell align="right">{formatThousand(row.grand_total)}</TableCell>
              <TableCell>
                <Chip color={statusColor(row.status)} label={row.status} />
              </TableCell>
              <TableCell align="right">
                <Link
                  href={
                    admin
                      ? `/admin/approval/${encodeURIComponent(row.id_po)}`
                      : `/dashboard/po/${encodeURIComponent(row.id_po)}`
                  }
                  passHref
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default POTable;
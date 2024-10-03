import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const StandardTable = memo(function StandardTable({ data, columns, renderSubComponent }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              sx={{
                "& th": {
                  color: "white",
                  backgroundColor: "primary.main",
                  borderLeft: 1,
                  borderRight: 1,
                },
              }}
            >
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <TableRow>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {renderSubComponent && row.getIsExpanded() && (
                <TableRow>
                  {/* 2nd row is a custom 1 cell row */}
                  <TableCell colSpan={row.getVisibleCells().length}>
                    {renderSubComponent({ row })}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
export default StandardTable;

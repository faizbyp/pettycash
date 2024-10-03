"use client";

import { memo, useMemo } from "react";
import StandardTable from "./StandardTable";
import moment from "moment";
import useFetch from "@/hooks/useFetch";
import { formatPercent, formatThousand } from "@/helper/helper";
import { IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ComparisonTable = memo(function ComparisonTable({ data }) {
  const columns = useMemo(
    () => [
      {
        header: () => null,
        id: "expander",
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <IconButton
              {...{
                onClick: row.getToggleExpandedHandler(),
              }}
            >
              {row.getIsExpanded() ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          ) : null;
        },
      },
      {
        header: "ID",
        columns: [
          {
            header: "Conf.",
            accessorKey: "id_gr",
            cell: (props) => props.getValue(),
          },
          {
            header: "Plan",
            accessorKey: "id_po",
            cell: (props) => props.getValue(),
          },
        ],
      },
      {
        header: "Date",
        columns: [
          {
            header: "Conf.",
            accessorKey: "gr_date",
            cell: (props) => moment(props.getValue()).format("DD/MM/YYYY"),
          },
          {
            header: "Plan",
            accessorKey: "po_date",
            cell: (props) => moment(props.getValue()).format("DD/MM/YYYY"),
          },
        ],
      },
      {
        header: "User",
        accessorKey: "user_name",
        cell: (props) => props.getValue(),
      },
      {
        header: "Company",
        accessorKey: "company_name",
        cell: (props) => props.getValue(),
      },
      {
        header: "Vendor",
        accessorKey: "vendor_name",
        cell: (props) => props.getValue(),
      },
      {
        header: "Sub Total",
        columns: [
          {
            header: "Conf.",
            accessorKey: "gr_sub",
            cell: (props) => formatThousand(props.getValue()),
          },
          {
            header: "Plan",
            accessorKey: "po_sub",
            cell: (props) => formatThousand(props.getValue()),
          },
        ],
      },
      {
        header: "PPN",
        columns: [
          {
            header: "Conf.",
            accessorKey: "gr_ppn",
            cell: (props) => formatPercent(props.getValue()),
          },
          {
            header: "Plan",
            accessorKey: "po_ppn",
            cell: (props) => formatPercent(props.getValue()),
          },
        ],
      },
      {
        header: "Grand Total",
        columns: [
          {
            header: "Conf.",
            accessorKey: "gr_total",
            cell: (props) => formatThousand(props.getValue()),
          },
          {
            header: "Plan",
            accessorKey: "po_total",
            cell: (props) => formatThousand(props.getValue()),
          },
        ],
      },
    ],
    []
  );

  const itemColumns = useMemo(
    () => [
      {
        header: "Item",
        accessorKey: "description",
        cell: (props) => props.getValue(),
      },
      {
        header: "Quantity",
        columns: [
          {
            header: "Conf.",
            accessorKey: "gr_qty",
            cell: (props) => props.getValue(),
          },
          {
            header: "Plan",
            accessorKey: "po_qty",
            cell: (props) => props.getValue(),
          },
        ],
      },
      {
        header: "UOM",
        accessorKey: "uom",
        cell: (props) => props.getValue(),
      },
      {
        header: "Unit Price",
        columns: [
          {
            header: "Conf.",
            accessorKey: "gr_unit_price",
            cell: (props) => formatThousand(props.getValue()),
          },
          {
            header: "Plan",
            accessorKey: "po_unit_price",
            cell: (props) => formatThousand(props.getValue()),
          },
        ],
      },
      {
        header: "Amount",
        columns: [
          {
            header: "Conf.",
            accessorKey: "gr_amount",
            cell: (props) => formatThousand(props.getValue()),
          },
          {
            header: "Plan",
            accessorKey: "po_amount",
            cell: (props) => formatThousand(props.getValue()),
          },
        ],
      },
    ],
    []
  );

  const itemTable = ({ row }) => {
    return (
      <>
        <Typography sx={{ fontWeight: "bold" }}>{row.original.id_gr}</Typography>
        <StandardTable columns={itemColumns} data={row.original.items} />
      </>
    );
  };

  return <StandardTable columns={columns} data={data} renderSubComponent={itemTable} />;
});

export default ComparisonTable;

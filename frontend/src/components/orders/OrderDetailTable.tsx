import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { OrderItem } from "../../types/order";
import { Link } from "react-router-dom";

interface Props {
  data: OrderItem[];
}

const columnHelper = createColumnHelper<OrderItem>();

const columns = [
  columnHelper.accessor("productId", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("productName", {
    header: "Nombre",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("quantity", {
    header: "Cantidad",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("unitPrice", {
    header: "Precio Unitario",
    cell: (info) => info.getValue(),
  }),

  columnHelper.display({
    id: "subTotal",
    header: "Sub Total",
    cell: (info) => {
      const { quantity, unitPrice } = info.row.original;

      return `$ ${quantity * unitPrice}`;
    },
  }),
];

export default function OrderDetailTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

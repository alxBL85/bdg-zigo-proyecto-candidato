import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { OrderHeader } from "../../types/order";
import { Link } from "react-router-dom";

interface Props {
  data: OrderHeader[];
}

const columnHelper = createColumnHelper<OrderHeader>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("customerId", {
    header: "Customer ID",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("total", {
    header: "Total",
    cell: (info) => `$ ${info.getValue()}`,
  }),

  columnHelper.accessor("notes", {
    header: "Notas",
    cell: (info) => info.getValue(),
  }),

  columnHelper.display({
    id: "details",
    header: "Detalle",
    cell: (info) => {
      const orden = info.row.original;

      return <Link to={`/order/${orden.id}`}>Ver Detalle</Link>;
    },
  }),
];

export default function CustomerOrdersTable({ data }: Props) {
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

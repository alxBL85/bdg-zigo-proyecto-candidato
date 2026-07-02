import { OrderDetail } from "./OrderDetail";

export type OrderHeader = {
  id: string;
  customerId: string;
  status: string;
  total: number;
  notes?: string;
  items?: OrderDetail[];
};

export function mapOrderHeader(row: any): OrderHeader {
  return (
    row &&
    ({
      id: row.id,
      customerId: row.customer_id,
      status: row.status,
      total: row.total,
      notes: row?.notes,
    } as OrderHeader)
  );
}

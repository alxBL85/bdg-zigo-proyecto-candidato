import { query } from "../../shared/db";
import { OrderHeader, mapOrderHeader } from "../../shared/types/OrderHeader";

export async function handleGetCustomerOrders(
  customerId: string,
): Promise<OrderHeader | null> {
  const result = await query(
    `SELECT o.id, o.customer_id, o.status, o.total, o.notes FROM orders o WHERE o.customer_id = $1`,
    [customerId],
  );

  return mapOrderHeader(result?.rows[0]) || null;
}

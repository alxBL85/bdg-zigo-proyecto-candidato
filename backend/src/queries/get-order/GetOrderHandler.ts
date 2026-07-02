import { query } from "../../shared/db";
import type { OrderHeader } from "../../shared/types/OrderHeader";

function mapOrderHeader(row: any): OrderHeader {
  return {
    id: row.id,
    customerId: row.customer_id,
    status: row.status,
    total: row.total,
  } as OrderHeader;
}

export async function handleGetOrder(
  orderId: string,
): Promise<OrderHeader | null> {
  try {
    const result = await query(
      `SELECT o.id, o.customer_id, o.status, o.total FROM orders o WHERE id = $1`,
      [orderId],
    );
    return mapOrderHeader(result?.rows[0]) || null;
  } catch (error) {
    console.log(">>> error:", error);
    return null;
  }
}

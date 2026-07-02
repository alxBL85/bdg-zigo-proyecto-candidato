import { query } from "../../shared/db";
import { OrderDetail } from "../../shared/types/OrderDetail";

function mapDetailOrder(row: any): OrderDetail {
  return {
    productId: row.product_id,
    productName: row.name,
    quantity: row.quantity,
    unitPrice: row.unit_price,
  } as OrderDetail;
}

export async function handleGetOrderDetails(
  orderId: string,
): Promise<OrderDetail[] | undefined> {
  const details = await query(
    `SELECT oi.product_id, 
	   oi.quantity, 
	   oi.unit_price, 
	   p.sku, 
	   p.name
	   FROM order_items oi
      INNER JOIN products p on oi.product_id = p.id
      WHERE order_id = $1`,
    [orderId],
  );
  return details?.rows?.map(mapDetailOrder) || null;
}

import { query } from "../../shared/db";

export async function handleGetOrderDetails(orderId: string) {
  try {
    const details = await query(
      `SELECT * FROM order_items WHERE order_id = $1`,
      [orderId],
    );
    return details?.rows || null;
  } catch (error) {
    console.log(">>> ", error);
  }
}

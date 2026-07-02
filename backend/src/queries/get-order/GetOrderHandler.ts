import { query } from "../../shared/db";

export async function handleGetOrder(orderId: string) {
  try {
    const result = await query(`SELECT * FROM orders WHERE id = $1`, [orderId]);
    return result.rows[0] || null;
  } catch (error) {
    console.log(">>> error:", error);
  }
}

import { query } from "../../shared/db";

export interface StockCheckItem {
  productId: string;
  quantity: number;
}

export interface StockCheckResponse {
  success: boolean;
  message?: string;
}

export async function handleCheckStock(
  items: StockCheckItem[],
): Promise<StockCheckResponse> {
  if (!Array.isArray(items) || items.length === 0) {
    return { success: true };
  }

  const productIds = items
    .map((item) => item.productId)
    .filter((productId): productId is string => Boolean(productId));

  if (productIds.length === 0) {
    return { success: true };
  }

  const result = await query(
    `SELECT product_id, stock
     FROM warehouse
     WHERE product_id = ANY($1::uuid[])`,
    [productIds],
  );

  const stockByProduct = new Map<string, number>(
    result.rows.map((row: any) => [row.product_id, Number(row.stock)]),
  );

  for (const item of items) {
    const availableStock = stockByProduct.get(item.productId) ?? 0;

    if (availableStock < item.quantity) {
      return {
        success: false,
        message: `Insufficient stock for product ${item.productId}`,
      };
    }
  }

  return { success: true };
}

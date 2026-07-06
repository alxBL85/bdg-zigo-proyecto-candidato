import { randomUUID } from "crypto";
import { query } from "../../shared/db";
import axios from "axios";
import { CreateOrderCommand } from "./CreateOrderCommand";
import { env } from "../../config/env";

const INVENTORY_SERVICE_URL = env.inventoryUrl || "http://inventory:3000";

export async function handleCreateOrder(cmd: CreateOrderCommand) {
  const requestedProductIds = cmd.items.map((i) => i.productId);

  const productResult = await query(
    `SELECT p.id,
       p.sku,
       p.name,
       p.unit_price,
       p.stock,
       COALESCE(s.name, 'N/A') AS supplier_name,
       COALESCE(w.stock, 0) AS warehouse_stock
    FROM products p
    LEFT JOIN supplier_products sp ON sp.product_id = p.id AND sp.effective_to IS NULL
    LEFT JOIN suppliers s ON s.id = sp.supplier_id
    LEFT JOIN warehouse w ON w.product_id = p.id
    WHERE p.id = ANY($1::uuid[])`,
    [requestedProductIds],
  );

  if (productResult.rows.length !== new Set(requestedProductIds).size) {
    throw new Error("One or more products not found");
  }

  let total = 0;
  for (const item of cmd.items) {
    const product = productResult.rows.find((r) => r.id === item.productId);
    if (product) {
      total += product.unit_price * item.quantity * 1.16;
    }
  }

  const stockCheck = await axios.post(`${INVENTORY_SERVICE_URL}/stock/check`, {
    items: cmd.items,
  });

  if (!stockCheck.data.success) {
    throw new Error(stockCheck.data.message || "Insufficient stock");
  }

  const orderId = randomUUID();

  await query(
    `INSERT INTO orders (id, customer_id, status, total, notes) VALUES ($1, $2, 'DRAFT', $3, $4)`,
    [orderId, cmd.customerId, total, cmd.notes ?? null],
  );

  const orderItemValues: any[] = [];
  const orderItemPlaceholders: string[] = [];

  for (const item of cmd.items) {
    const product = productResult.rows.find(
      (row: any) => row.id === item.productId,
    );

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    const itemId = randomUUID();
    orderItemValues.push(
      itemId,
      orderId,
      item.productId,
      item.quantity,
      product.unit_price,
    );
    orderItemPlaceholders.push(
      `($${orderItemValues.length - 4}, $${orderItemValues.length - 3}, $${orderItemValues.length - 2}, $${orderItemValues.length - 1}, $${orderItemValues.length})`,
    );
  }

  if (orderItemPlaceholders.length > 0) {
    await query(
      `INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES ${orderItemPlaceholders.join(", ")}`,
      orderItemValues,
    );
  }

  return { success: true, orderId, total };
}

import { query } from "../../shared/db";
import { Customer, mapCustomer } from "../../shared/types/Customer";

export async function handleGetCustomers(): Promise<Customer[] | null> {
  const result = await query(`SELECT id, email, name FROM customers `);
  return result?.rows.map(mapCustomer) || null;
}

export async function handleGetCustomer(
  customerId: string,
): Promise<Customer | null> {
  const result = await query(
    `SELECT id, email, name FROM customers WHERE id = $1`,
    [customerId],
  );
  return mapCustomer(result.rows[0]) || null;
}

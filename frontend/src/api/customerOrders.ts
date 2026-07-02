import axios from "axios";
import type { OrderHeader } from "../types/order";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export async function fetchCustomerOrders(
  customerId: string,
): Promise<OrderHeader[]> {
  const { data } = await api.get<OrderHeader[]>(
    `/customers/${customerId}/orders`,
  );

  return data;
}

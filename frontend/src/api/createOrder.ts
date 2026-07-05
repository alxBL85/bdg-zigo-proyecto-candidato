import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export interface CreateOrderPayload {
  customerId: string;
  notes?: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  idempotencyKey?: string;
}

export async function createOrder(payload: CreateOrderPayload) {
  const { data } = await api.post("/orders", payload);
  return data;
}

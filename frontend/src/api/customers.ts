import axios from "axios";
import type { Customer } from "../types/customer";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export async function fetchCustomers(): Promise<Customer[]> {
  const { data } = await api.get<Customer[]>("/customers");
  return data;
}

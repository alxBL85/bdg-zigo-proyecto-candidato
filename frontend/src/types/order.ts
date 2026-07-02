export type OrderStatus = "DRAFT" | "CONFIRMED" | "CANCELLED";
export interface OrderHeader {
  id: string;
  customerId: string;
  status: OrderStatus;
  total: number;
  notes?: string;
}

export interface Order extends OrderHeader {
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  productName?: string;
  quantity: number;
  unitPrice: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  unitPrice: number;
  stock: number;
}

export interface CreateOrderPayload {
  customerId: string;
  items: { productId: string; quantity: number }[];
  notes?: string;
}

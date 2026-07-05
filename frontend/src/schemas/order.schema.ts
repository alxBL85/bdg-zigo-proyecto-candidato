import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Producto es Requerido"),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
});

export const createOrderSchema = z.object({
  customerId: z.string(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1, "Al menos un item es requerido"),
});

export type CreateOrderFormData = z.infer<typeof createOrderSchema>;

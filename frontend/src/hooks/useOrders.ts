import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../api/orders";

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
    enabled: !!orderId,
  });
}

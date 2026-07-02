import { useQuery } from "@tanstack/react-query";
import { fetchCustomerOrders } from "../api/customerOrders";

export function useCustomerOrders(customerId: string) {
  return useQuery({
    queryKey: ["customer-orders", customerId],
    queryFn: () => fetchCustomerOrders(customerId),
    enabled: !!customerId,
  });
}

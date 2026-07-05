import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOrder, type CreateOrderPayload } from "../api/createOrder";

export function useCreateOrder(customerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer-orders", customerId],
      });
    },
  });
}

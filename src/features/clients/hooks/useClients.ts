import type User from "@/features/users/model/User";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../api/getClients";
import { useShopQuery } from "@/features/shop/hooks/useShop";

export function useClientsQuery() {
  const { data: shop } = useShopQuery();
  const query = useQuery<User[], Error>({
    queryKey: ["clients", shop?.id ?? ""],
    queryFn: () => getClients(shop?.id ?? ""),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}

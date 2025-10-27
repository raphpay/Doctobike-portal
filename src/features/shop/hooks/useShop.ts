import { useQuery } from "@tanstack/react-query";
import type Shop from "../model/Shop";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { useEmployeeQuery } from "@/features/employees/hooks/useEmployee";
import { getShop } from "../api/getShop";

export function useShopQuery() {
  const { data: employee } = useEmployeeQuery();
  const query = useQuery<Shop, Error>({
    queryKey: [CacheKeys.SHOP],
    queryFn: () => getShop(employee?.shopID ?? ""),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}

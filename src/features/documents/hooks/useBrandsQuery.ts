import { useQuery } from "@tanstack/react-query";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { getBrands } from "../api/getBrands";
import type Brand from "../models/Brand";

export function useBrandsQuery() {
  const query = useQuery<Brand[], Error>({
    queryKey: [CacheKeys.BRANDS],
    queryFn: () => getBrands(),
  });

  function selectBrand(brand: Brand) {
    // Implement logic to select a brand
    console.log(brand);
  }

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
    selectBrand,
  };
}

import { useQuery } from "@tanstack/react-query";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { getYears, type YearsResponse } from "../api/getYears";

export function useYearsQuery({
  brand,
  model,
  page,
}: {
  brand: string;
  model: string;
  page: number;
}) {
  const query = useQuery<YearsResponse, Error>({
    queryKey: [CacheKeys.YEARS, brand, model, page],
    queryFn: () => getYears(brand, model, page),
    // keepPreviousData: true, // Garde les données précédentes pendant le chargement (meilleure UX)
    staleTime: 1000 * 60 * 5, // Garde les données pendant 5 minutes
    // cacheTime: 1000 * 60 * 60 * 24, // Garde les données pendant 24 heures
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data?.years,
    totalCount: query.data?.totalCount,
    refetch: query.refetch,
  };
}

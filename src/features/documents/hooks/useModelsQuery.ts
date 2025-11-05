import { useQuery } from "@tanstack/react-query";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { getModels } from "../api/getModels";
import type { ModelsResponse } from "../api/getModels";

export function useModelsQuery({
  brand,
  page,
}: {
  brand: string;
  page: number;
}) {
  const query = useQuery<ModelsResponse, Error>({
    queryKey: [CacheKeys.MODELS, brand, page],
    queryFn: () => getModels(brand, page),
    // keepPreviousData: true, // Garde les données précédentes pendant le chargement (meilleure UX)
    staleTime: 1000 * 60 * 5, // Garde les données pendant 5 minutes
    // cacheTime: 1000 * 60 * 60 * 24, // Garde les données pendant 24 heures
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data?.models, // Retourne uniquement la liste des modèles
    totalCount: query.data?.totalCount, // Retourne le compte total
    refetch: query.refetch,
  };
}

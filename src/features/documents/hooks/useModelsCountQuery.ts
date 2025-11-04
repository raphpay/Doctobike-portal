import { useQuery } from "@tanstack/react-query";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { getModelsCount } from "../api/getModelsCount";

export function useModelsCountQuery({ brand }: { brand: string }) {
  const query = useQuery<number, Error>({
    queryKey: [CacheKeys.MODELS, brand],
    queryFn: () => getModelsCount(brand),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}

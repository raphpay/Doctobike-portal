import type User from "@/features/users/model/User";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/features/users/api/getUser";
import CacheKeys from "@/features/cache/model/CacheKeys";

export function useClientQuery({ id }: { id: string }) {
  const query = useQuery<User, Error>({
    queryKey: [`${CacheKeys.CLIENT}-${id}`],
    queryFn: () => getUser(id),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}

import useUser from "@/features/users/hooks/useUser";
import type User from "@/features/users/model/User";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../api/getClients";

export function useClientsQuery() {
  const { shop } = useUser();
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

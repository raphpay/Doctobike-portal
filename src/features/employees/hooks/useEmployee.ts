import { useQuery } from "@tanstack/react-query";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { getEmployeeFromUser } from "../api/getEmployeeFromUser";
import type Employee from "../model/Employee";

export function useEmployeeQuery() {
  const query = useQuery<Employee, Error>({
    queryKey: [CacheKeys.EMPLOYEE],
    queryFn: () => {
      const id = localStorage.getItem(CacheKeys.USER_ID);
      return getEmployeeFromUser(id ?? "");
    },
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}

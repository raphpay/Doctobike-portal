import { useQuery } from "@tanstack/react-query";
import CacheKeys from "@/features/cache/model/CacheKeys";
import type Appointment from "../model/Appointment";
import { getAppointments } from "../api/getAppointments";

export function useAppointmentsQuery(shopID: string) {
  const query = useQuery<Appointment[], Error>({
    queryKey: [`${CacheKeys.APPOINTMENTS}-${shopID}`],
    queryFn: () => getAppointments(shopID),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}

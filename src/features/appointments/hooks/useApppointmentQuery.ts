import { useQuery } from "@tanstack/react-query";
import CacheKeys from "@/features/cache/model/CacheKeys";
import type Appointment from "../model/Appointment";

import { getAppointment } from "../api/getAppointment";

export function useAppointmentQuery(rdvID: string) {
  const query = useQuery<Appointment, Error>({
    queryKey: [`${CacheKeys.APPOINTMENT}-${rdvID}`],
    queryFn: () => getAppointment(rdvID),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}

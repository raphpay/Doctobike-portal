import { getUser } from "@/features/users/api/getUser";
import type { RDVListItemProps } from "../components/RDVListItem";
import { useAppointmentQuery } from "./useApppointmentQuery";
import { useEffect, useState } from "react";
import type User from "@/features/users/model/User";
import type Bike from "@/features/bikes/model/Bike";
import { getBike } from "@/features/bikes/api/getBike";
import { formatDate } from "@/shared/utils/dates";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppointmentStatus } from "../model/Appointment";
import { updateAppointmentStatus } from "../api/updateAppointmentStatus";
import CacheKeys from "@/features/cache/model/CacheKeys";
import type Appointment from "../model/Appointment";
import { toast } from "react-toastify";

export default function useRDVListItem({ rdv }: RDVListItemProps) {
  const queryClient = useQueryClient();
  const { navigate } = useNavigationStack();

  const { data, error, isLoading } = useAppointmentQuery(rdv.id);
  const [user, setUser] = useState<User | null>(null);
  const [bike, setBike] = useState<Bike | null>(null);
  const [scheduledAt, setScheduledAt] = useState<string | null>(null);

  function goToDocs() {
    navigate(NavigationRoutes.TECHNICAL_DOCUMENTS, "", { bike });
  }

  async function loadUser() {
    if (data && data.userID) {
      const user = await getUser(data.userID);
      if (user) {
        setUser(user);
      }
    }
  }

  async function loadBike() {
    if (data && data.bikeID) {
      const bike = await getBike(data.bikeID);
      if (bike) {
        setBike(bike);
      }
    }
  }

  async function loadScheduledAt() {
    if (data && data.scheduledAt) {
      const date = formatDate(data.scheduledAt);
      setScheduledAt(date);
    }
  }

  const mutation = useMutation({
    mutationFn: ({
      id,
      newStatus,
    }: {
      id: string;
      newStatus: AppointmentStatus;
    }) => updateAppointmentStatus(id, newStatus),
    onSuccess: (data: Appointment) => {
      // Invalidate the request to force a data reload
      queryClient.invalidateQueries({
        queryKey: [`${CacheKeys.APPOINTMENT}-${data.id}`],
      });
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  async function tapOnUpdateStatus() {
    if (data?.status === AppointmentStatus.COMPLETED) return;
    const newStatus =
      data?.status === AppointmentStatus.TODO
        ? AppointmentStatus.IN_PROGRESS
        : AppointmentStatus.COMPLETED;
    await mutation.mutateAsync({
      id: data?.id ?? "",
      newStatus: newStatus,
    });
  }

  useEffect(() => {
    loadUser();
    loadBike();
    loadScheduledAt();
  }, [data, error, isLoading]);

  return {
    data,
    error,
    isLoading,
    user,
    bike,
    scheduledAt,
    goToDocs,
    tapOnUpdateStatus,
  };
}

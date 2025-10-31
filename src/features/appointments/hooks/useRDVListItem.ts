import { getUser } from "@/features/users/api/getUser";
import type { RDVListItemProps } from "../components/RDVListItem";
import { useAppointmentQuery } from "./useApppointmentQuery";
import { useEffect, useState } from "react";
import type User from "@/features/users/model/User";
import type Bike from "@/features/bikes/model/Bike";
import { getBike } from "@/features/bikes/api/getBike";
import { formatDate } from "@/shared/utils/dates";

export default function useRDVListItem({ rdv }: RDVListItemProps) {
  const { data, error, isLoading } = useAppointmentQuery(rdv.id);
  const [user, setUser] = useState<User | null>(null);
  const [bike, setBike] = useState<Bike | null>(null);
  const [scheduledAt, setScheduledAt] = useState<string | null>(null);

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

  useEffect(() => {
    loadUser();
    loadBike();
    loadScheduledAt();
  }, [data, error, isLoading]);

  return { data, error, isLoading, user, bike, scheduledAt };
}

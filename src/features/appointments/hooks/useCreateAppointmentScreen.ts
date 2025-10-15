import { createAppointment } from "@/features/appointments/api/createAppointment";
import useAuth from "@/features/auth/hooks/useAuth";
import { fetchBikeFromSerialNumber } from "@/features/bikes/api/fetchBikeWithSerialNumber";
import type Bike from "@/features/bikes/model/Bike";
import { getEmployeeFromUser } from "@/features/employees/api/getEmployeeFromUser";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useCreateAppointmentScreen() {
  const { user } = useAuth();
  const [bike, setBike] = useState<Bike | null>(null);
  const [scheduledAt, setScheduledAt] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");

  async function searchBike() {
    let fetched: Bike | null = null;
    try {
      fetched = await fetchBikeFromSerialNumber(serialNumber);
      setBike(fetched);
    } catch (error) {
      const message = (error as Error).message;
      toast.error(message);
      return;
    }
  }

  async function submitAppointment() {
    let shopID: string | null = null;
    if (!bike || !user) return;

    if (bike.shopID) {
      shopID = bike.shopID;
    } else {
      try {
        const employee = await getEmployeeFromUser(user.id);
        shopID = employee.shopID;
      } catch (error) {
        const message = (error as Error).message;
        toast.error(message);
        return;
      }
    }

    try {
      createAppointment({
        bikeID: bike.id,
        shopID: shopID,
        userID: bike.userID,
        scheduledAt,
        notes,
      });
    } catch (error) {}
  }

  return {
    bike,
    scheduledAt,
    setSerialNumber,
    setScheduledAt,
    setNotes,
    searchBike,
    submitAppointment,
  };
}

import { createAppointment } from "@/features/appointments/api/createAppointment";
import useAuth from "@/features/auth/hooks/useAuth";
import { fetchBikeFromSerialNumber } from "@/features/bikes/api/fetchBikeWithSerialNumber";
import type Bike from "@/features/bikes/model/Bike";
import { getEmployeeFromUser } from "@/features/employees/api/getEmployeeFromUser";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useCreateAppointmentScreen() {
  const { user } = useAuth();
  const { goBack } = useNavigationStack();
  const [bike, setBike] = useState<Bike | null>(null);
  const [scheduledAt, setScheduledAt] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [showCreateBikeDialog, setShowCreateBikeDialog] =
    useState<boolean>(false);

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
    setIsSubmitDisabled(true);
    let shopID: string | null = null;
    if (!bike || !user) {
      setIsSubmitDisabled(true);
      return;
    }

    if (bike.shopID) {
      shopID = bike.shopID;
    } else {
      try {
        const employee = await getEmployeeFromUser(user.id);
        shopID = employee.shopID;
      } catch (error) {
        const message = (error as Error).message;
        toast.error(message);
        setIsSubmitDisabled(true);
        return;
      }
    }

    if (scheduledAt) {
      try {
        createAppointment({
          bikeID: bike.id,
          shopID: shopID,
          userID: bike.userID,
          scheduledAt,
          notes,
        });
        // Success
        toast.success("RDV ajouté");
        setIsSubmitDisabled(true);
        setNotes("");
        setSerialNumber("");
        setBike(null);
        setTimeout(() => {
          goBack();
        }, 2000);
      } catch (error) {
        const message = (error as Error).message;
        toast.error(message);
        setIsSubmitDisabled(true);
        return;
      }
    } else {
      setIsSubmitDisabled(true);
      toast.error("Veuillez sélectionner une date");
    }
  }

  return {
    serialNumber,
    bike,
    scheduledAt,
    notes,
    isSubmitDisabled,
    showCreateBikeDialog,
    setSerialNumber,
    setScheduledAt,
    setNotes,
    searchBike,
    submitAppointment,
    setShowCreateBikeDialog,
  };
}

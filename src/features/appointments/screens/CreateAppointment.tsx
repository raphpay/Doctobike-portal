import useCreateAppointmentScreen from "@/features/appointments/hooks/useCreateAppointmentScreen";
import { Button } from "@/shared/components/ui/button";
import { DateTimePicker } from "@/shared/components/ui/date-time-picker";

import { Input } from "@/shared/components/ui/input";
import { ToastContainer } from "react-toastify";

const CreateAppointment = () => {
  const {
    serialNumber,
    bike,
    scheduledAt,
    notes,
    setSerialNumber,
    setScheduledAt,
    setNotes,
    searchBike,
    submitAppointment,
  } = useCreateAppointmentScreen();

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-2">
      <Input
        value={serialNumber}
        placeholder="UHUH37Y7Y"
        onChangeCapture={(e) => setSerialNumber(e.currentTarget.value)}
      />
      <Button onClick={searchBike}>Rechercher</Button>

      {bike && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 border-1 border-black rounded-xl p-4 justify-center items-center">
            <p>Vélo trouvé : </p>
            <p>
              {bike.brand} - {bike.model}
            </p>
          </div>
          <DateTimePicker date={scheduledAt} setDate={setScheduledAt} />

          <div className="flex flex-col items-start">
            <p>Notes :</p>
            <textarea
              value={notes}
              className="border-1 border-black p-4 w-full"
              placeholder="Dérailleur à vérifier. Chambre à air à changer."
              onChange={(e) => setNotes(e.currentTarget.value)}
            />
          </div>

          <Button onClick={submitAppointment}>Créer le RDV</Button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateAppointment;

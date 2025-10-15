import useCreateAppointmentScreen from "@/features/appointments/hooks/useCreateAppointmentScreen";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

const CreateAppointment = () => {
  const {
    bike,
    scheduledAt,
    setSerialNumber,
    setScheduledAt,
    setNotes,
    searchBike,
    submitAppointment,
  } = useCreateAppointmentScreen();

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-2">
      <Input
        placeholder="UHUH37Y7Y"
        onChangeCapture={(e) => setSerialNumber(e.currentTarget.value)}
      />
      <Button onClick={searchBike}>Rechercher</Button>

      {bike && (
        <div className="flex flex-col gap-2 border-1 border-black rounded-xl p-4 justify-center items-center">
          <p>Vélo trouvé : </p>
          <p>
            {bike.brand} - {bike.model}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateAppointment;

import type Appointment from "../model/Appointment";
import Card from "@/shared/components/Card";
import useRDVListItem from "../hooks/useRDVListItem";
import { Button } from "@/shared/components/ui/button";

export interface RDVListItemProps {
  rdv: Appointment;
}

export default function RDVListItem({ rdv }: RDVListItemProps) {
  const { data, error, isLoading, user, bike, scheduledAt } = useRDVListItem({
    rdv,
  });

  if (error) {
    return (
      <Card>
        <div className="flex flex-col w-full">
          <p className="text-sm font-medium">
            Erreur lors du chargement du RDV
          </p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col w-full">
          <p className="text-sm font-medium">Chargement du RDV...</p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <div className="flex flex-col w-full">
          <p className="text-sm font-medium">Aucun RDV trouvé</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col w-full justify-start text-start gap-2">
        {user && <p className="text-lg font-semibold">{user.name}</p>}
        <div className="flex gap-2">
          {bike && (
            <p className="text-md font-semibold">
              {bike.brand} - {bike.model}
            </p>
          )}
          <p className="font-normal">le {scheduledAt}</p>
        </div>
        {data.notes && <p className="font-normal">{data.notes}</p>}

        <div className="flex justify-between">
          <Button className="w-3/4">Voir la doc</Button>
          <Button variant={"secondary"}>Fait</Button>
        </div>
      </div>
    </Card>
  );
}

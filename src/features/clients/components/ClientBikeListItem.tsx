import type Bike from "@/features/bikes/model/Bike";
import { Button } from "@/shared/components/ui/button";
import useClientBikeListItem from "../hooks/useClientBikeListItem";

export interface ClientBikeListItemProps {
  bike: Bike;
}

export default function ClientBikeListItem({ bike }: ClientBikeListItemProps) {
  const { bikePurchaseDate, navigateToBikeRDV, navigateToBikeDocs } =
    useClientBikeListItem({ bike });

  return (
    <div
      key={bike.id}
      className="flex flex-col items-start text-main-foreground bg-secondary-background border-2 border-border shadow-shadow p-4 gap-4"
    >
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-lg font-semibold">
          {bike.brand} - {bike.model}
        </h2>
        <p>Acheté le {bikePurchaseDate}</p>
      </div>

      <div className="flex w-full gap-4">
        <Button onClick={navigateToBikeDocs} className="w-full">
          Voir la doc
        </Button>
        <Button onClick={navigateToBikeRDV} variant="secondary">
          RDV
        </Button>
      </div>
    </div>
  );
}

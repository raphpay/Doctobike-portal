import type User from "@/features/users/model/User";
import { Button } from "@/shared/components/ui/button";

interface ClientListItemProps {
  client: User;
}

export default function ClientListItem({ client }: ClientListItemProps) {
  return (
    <div className="relative text-main-foreground bg-secondary-background border-2 border-border shadow-shadow shadow-border flex p-4">
      {/* Tag */}
      <div className="absolute -top-3 -right-3 bg-chart-4 text-main-foreground border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-shadow">
        Entretien à prévoir
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full items-start">
          <div className="text-xl font-semibold">{client.name}</div>
          <div className="text-xs text-muted-foreground">{client.email}</div>
        </div>

        <div className="flex justify-between w-full items-center gap-4">
          <Button className="w-2/4">Plus d'infos</Button>
          <Button className="w-1/4" variant="secondary">
            RDV
          </Button>
        </div>
      </div>
    </div>
  );
}

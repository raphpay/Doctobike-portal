import type User from "@/features/users/model/User";
import { Button } from "@/shared/components/ui/button";
import useSelectClientListItem from "../hooks/useSelectClientListItem";

export interface SelectClientListItemProps {
  client: User;
}

export default function SelectClientListItem({
  client,
}: SelectClientListItemProps) {
  const { selectClient } = useSelectClientListItem({ client });
  return (
    <div className="relative text-main-foreground bg-secondary-background border-2 border-border shadow-shadow shadow-border flex p-4">
      {/* Main content */}
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full items-start">
          <div className="text-xl font-semibold">{client.name}</div>
          <div className="text-xs text-muted-foreground">{client.email}</div>
        </div>

        <Button onClick={selectClient}>Sélectionner</Button>
      </div>
    </div>
  );
}

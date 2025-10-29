import AppContainer from "@/shared/components/AppContainer";
import { Button } from "@/shared/components/ui/button";
import useClientsScreen from "../hooks/useClientsScreen";
import ClientListItem from "../components/ClientListItem";

export default function ClientsScreen() {
  const { clients, loading, tapOnAddClient } = useClientsScreen();

  if (loading) {
    return <div>Chargement des clients...</div>;
  }

  return (
    <AppContainer>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex w-full justify-end">
          <Button onClick={tapOnAddClient}>Ajouter un client</Button>
        </div>

        <div className="grid grid-cols-4">
          {clients &&
            clients.map((client, index) => (
              <ClientListItem key={index} client={client} />
            ))}
        </div>
      </div>
    </AppContainer>
  );
}

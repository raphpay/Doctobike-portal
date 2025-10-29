import { useEffect, useState } from "react";
import type Bike from "@/features/bikes/model/Bike";
import type { ClientListItemProps } from "../components/ClientListItem";
import { getClientBikes } from "@/features/bikes/api/getClientBikes";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";

export default function useClientListItem({ client }: ClientListItemProps) {
  const { navigate } = useNavigationStack();

  const [bikes, setBikes] = useState<Bike[]>([]);

  function navigateToClient() {
    navigate(NavigationRoutes.CLIENT, client.name, { id: client.id });
  }

  async function fetchBikes() {
    try {
      const bikes = await getClientBikes(client.id);
      setBikes(bikes ?? []);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des vélos du client",
        error,
      );
    }
  }

  useEffect(() => {
    fetchBikes();
  }, [client]);

  return { bikes, navigateToClient };
}

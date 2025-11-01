import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import type { SelectClientListItemProps } from "../components/SelectClientListItem";
import { getClientBikes } from "@/features/bikes/api/getClientBikes";
import { toast } from "react-toastify";

export default function useSelectClientListItem({
  client,
}: SelectClientListItemProps) {
  const { navigate } = useNavigationStack();

  async function selectClient() {
    let bikes = [];
    try {
      bikes = await getClientBikes(client.id);
    } catch (error) {
      console.error("Error fetching client bikes:", error);
      toast.error("Erreur lors de la récupération des vélos du client");
    }

    navigate(NavigationRoutes.CLIENT_RDV, `${client.name} - RDV`, {
      client: client,
      bikes: bikes,
    });
  }

  return { selectClient };
}

import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useClientsQuery } from "./useClients";

export default function useClientsScreen() {
  const { isLoading, error, data } = useClientsQuery();
  const { navigate } = useNavigationStack();

  function tapOnAddClient() {
    navigate(NavigationRoutes.ADD_CLIENT);
  }

  return { clients: data, loading: isLoading, error, tapOnAddClient };
}

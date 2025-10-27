import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";

export default function useClientsScreen() {
  const { navigate } = useNavigationStack();

  function tapOnAddClient() {
    navigate(NavigationRoutes.ADD_CLIENT);
  }

  return { tapOnAddClient };
}

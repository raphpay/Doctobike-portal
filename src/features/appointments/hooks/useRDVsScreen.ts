import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";

export default function useRDVsScreen() {
  const { navigate } = useNavigationStack();
  function createRDV() {
    navigate(NavigationRoutes.SELECT_CLIENT_RDV);
  }

  return { createRDV };
}

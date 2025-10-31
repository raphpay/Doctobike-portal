import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";

export default function useRDVsScreen() {
  const { navigate } = useNavigationStack();
  function createRDV() {
    navigate(NavigationRoutes.CLIENT_RDV, "", {
      id: undefined,
      bike: undefined,
    });
  }

  return { createRDV };
}

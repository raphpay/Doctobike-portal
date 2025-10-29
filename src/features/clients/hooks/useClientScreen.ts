import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useLocation } from "react-router-dom";

export default function useClientScreen() {
  const location = useLocation();
  const { navigate, goBack } = useNavigationStack();
  const { client, bikes } = location.state;

  function goToBikeCreation() {
    navigate(NavigationRoutes.ADD_BIKE);
  }

  return { client, bikes, goBack, goToBikeCreation };
}

import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";

export default function useTopBar() {
  const { navigate } = useNavigationStack();

  function handleNavigation(destination: string) {
    navigate(destination);
  }

  return { handleNavigation };
}

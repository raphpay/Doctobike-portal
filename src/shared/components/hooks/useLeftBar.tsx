import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";

export default function useLeftBar() {
  const { navigate } = useNavigationStack();

  function handleNavigation(destination: string) {
    navigate(destination);
  }

  return { handleNavigation };
}

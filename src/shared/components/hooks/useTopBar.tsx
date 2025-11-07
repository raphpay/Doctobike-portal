import { signOut } from "@/features/auth/api/signOut";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";

export default function useTopBar() {
  const { navigate } = useNavigationStack();

  function handleNavigation(destination: string) {
    navigate(destination);
  }

  async function handleLogOut() {
    await signOut();
  }

  return { handleNavigation, handleLogOut };
}

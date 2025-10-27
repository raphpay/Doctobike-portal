import { signIn } from "@/features/auth/api/signIn";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useLoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { navigate } = useNavigationStack();

  function tapOnSignUp() {
    navigate(NavigationRoutes.SIGN_UP);
  }

  async function tapOnLogin() {
    try {
      const res = await signIn(email, password);
      localStorage.setItem(CacheKeys.USER_ID, res.user.id);
    } catch (error) {
      const message = (error as Error).message ?? "Une erreur s'est produite";
      toast.error(message);
    }
  }

  return { setEmail, setPassword, tapOnLogin, tapOnSignUp };
}

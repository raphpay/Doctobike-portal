import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useState } from "react";

export default function useSignUpScreen() {
  const { navigate } = useNavigationStack();

  const [shopName, setShopName] = useState<string>("");
  const [shopCode, setShopCode] = useState<string>("");
  const [shopLocation, setShopLocation] = useState<string>("");
  const [managerName, setManagerName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function tapOnLogin() {
    navigate(NavigationRoutes.LOGIN);
  }

  async function tapOnSignUp() {}

  return {
    setShopName,
    setShopCode,
    setShopLocation,
    setManagerName,
    setEmail,
    setPassword,
    tapOnSignUp,
    tapOnLogin,
  };
}

import { signUp } from "@/features/auth/api/signUp";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { createEmployee } from "@/features/employees/api/createEmployee";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { createShop } from "@/features/shop/api/createShop";
import type Shop from "@/features/shop/model/Shop";
import { updateUser } from "@/features/users/api/updateUser";
import type User from "@/features/users/model/User";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import { useState } from "react";
import { toast } from "react-toastify";

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

  function handleError(error: any) {
    const message = (error as Error).message;
    toast.error(message);
  }

  async function tapOnSignUp() {
    let shop: Shop | null = null;
    let supabaseUser: SupabaseUser | null = null;
    let user: User | null = null;
    try {
      shop = await createShop({ name: shopName, address: shopLocation });
    } catch (error) {
      handleError(error);
    }

    if (!shop) {
      toast.error("Une erreur est survenue.");
      return;
    }

    try {
      const res = await signUp(email, password);
      supabaseUser = res.user;
    } catch (error) {
      handleError(error);
    }

    if (!supabaseUser) {
      toast.error("Une erreur est survenue");
      return;
    }

    try {
      user = await updateUser(supabaseUser.id, {
        name: managerName,
        role: "employee",
      });
    } catch (error) {
      handleError(error);
    }

    if (!user) {
      toast.error("Une erreur est survenue");
      return;
    }

    try {
      await createEmployee({
        shopID: shop.id,
        userID: user.id,
        roleInShop: "manager",
        fullName: managerName,
      });

      localStorage.setItem(CacheKeys.USER_ID, user.id);
    } catch (error) {
      handleError(error);
    }
  }

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

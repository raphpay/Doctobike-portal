import { signUp } from "@/features/auth/api/signUp";
import CacheKeys from "@/features/cache/model/CacheKeys";
import { createEmployee } from "@/features/employees/api/createEmployee";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { createShop } from "@/features/shop/api/createShop";
import type Shop from "@/features/shop/model/Shop";
import { checkValidity } from "@/features/shopCode/api/checkValidity";
import { markAsUsed } from "@/features/shopCode/api/markAsUsed";
import type ShopCode from "@/features/shopCode/model/ShopCode";
import { updateUser } from "@/features/users/api/updateUser";
import type User from "@/features/users/model/User";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "react-toastify";

export enum Tab {
  SHOP = "shop",
  EMPLOYEE = "employee",
}

export default function useSignUpScreen() {
  const { navigate } = useNavigationStack();

  const [shopName, setShopName] = useState<string>("");
  const [shopCode, setShopCode] = useState<string>("");
  const [shopLocation, setShopLocation] = useState<string>("");
  const [managerName, setManagerName] = useState<string>("");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>(Tab.SHOP);

  function tapOnLogin() {
    navigate(NavigationRoutes.LOGIN);
  }

  function handleError(error: any) {
    const message = (error as Error).message;
    toast.error(message);
  }

  async function signUpShop() {
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

  async function signUpEmployee() {
    let codeData: ShopCode | null = null;
    let supabaseUser: SupabaseUser | null = null;
    // Verify code
    try {
      codeData = await checkValidity(shopCode);
    } catch (error) {
      handleError(error);
      return;
    }

    if (!codeData) {
      toast.error("Ce code n'existe pas ou a déjà été utilisé.");
      return;
    }

    // Sign up
    try {
      const res = await signUp(email, password);
      supabaseUser = res.user;
    } catch (error) {
      handleError(error);
      return;
    }

    if (!supabaseUser) {
      toast.error("Une erreur est survenue");
      return;
    }

    // Create employee
    try {
      await createEmployee({
        userID: supabaseUser.id,
        shopID: codeData.shopID,
        roleInShop: "technician",
        fullName: employeeName,
      });
    } catch (error) {
      handleError(error);
      return;
    }

    // Update user
    try {
      await updateUser(supabaseUser.id, {
        name: employeeName,
        role: "employee",
      });
    } catch (error) {
      handleError(error);
      return;
    }

    // Invalidate code
    try {
      await markAsUsed(codeData);
    } catch (error) {
      handleError(error);
      return;
    }
  }

  async function tapOnSignUp() {
    if (selectedTab === Tab.SHOP) {
      console.log("1");
      await signUpShop();
    } else {
      console.log("2");
      await signUpEmployee();
    }
  }

  return {
    selectedTab,
    setShopName,
    setShopCode,
    setShopLocation,
    setManagerName,
    setEmail,
    setPassword,
    setSelectedTab,
    setEmployeeName,
    tapOnSignUp,
    tapOnLogin,
  };
}

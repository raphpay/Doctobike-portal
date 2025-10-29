import { signOut } from "@/features/auth/api/signOut";
import { useShopQuery } from "@/features/shop/hooks/useShop";
import { createShopCode } from "@/features/shopCode/api/createShopCode";
import type ShopCode from "@/features/shopCode/model/ShopCode";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useDashboardScreen() {
  const [shopCode, setShopCode] = useState<ShopCode | null>(null);
  const { data: shop } = useShopQuery();

  async function handleLogOut() {
    await signOut();
  }

  async function handleShopCodeCreation() {
    if (shop) {
      try {
        const res = await createShopCode({ shopID: shop.id });
        setShopCode(res);
        toast.success("Code de connexion créé !");
      } catch (error) {
        const message = (error as Error).message ?? "Une erreur s'est produite";
        toast.error(message);
      }
    } else {
      toast.error("Shop non trouvé");
    }
  }

  async function handleCopy() {
    if (shopCode) {
      navigator.clipboard.writeText(shopCode.code);
      toast.success("Code copié !");
    }
  }

  return { shopCode, handleLogOut, handleShopCodeCreation, handleCopy };
}

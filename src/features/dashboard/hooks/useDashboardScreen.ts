import { signOut } from "@/features/auth/api/signOut";
import { createShopCode } from "@/features/shopCode/api/createShopCode";
import type ShopCode from "@/features/shopCode/model/ShopCode";
import useUser from "@/features/users/hooks/useUser";
import { useState } from "react";

export default function useDashboardScreen() {
  const [shopCode, setShopCode] = useState<ShopCode | null>(null);
  const { shop } = useUser();

  async function handleLogOut() {
    await signOut();
  }

  async function handleShopCodeCreation() {
    if (shop) {
      try {
        const res = await createShopCode({ shopID: shop.id });
        setShopCode(res);
        // TODO: Show toast
        console.log("show toast");
      } catch (error) {
        // TODO: Show Toast
        console.log("Error");
      }
    } else {
      // TODO: Show error ( Shop non trouvé )
    }
  }

  async function handleCopy() {
    if (shopCode) navigator.clipboard.writeText(shopCode.code);
  }

  return { shopCode, handleLogOut, handleShopCodeCreation, handleCopy };
}

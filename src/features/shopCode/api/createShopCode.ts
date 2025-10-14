import type ShopCode from "@/features/shopCode/model/ShopCode";
import { supabase } from "@/lib/supabase";

export async function createShopCode(
  data: Omit<ShopCode, "id" | "code" | "isUsed" | "expiresAt" | "createdAt">
): Promise<ShopCode | null> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  const { data: inserted, error } = await supabase
    .from("shop_codes")
    .insert([
      {
        shop_id: data.shopID,
        expires_at: expiresAt,
      },
    ])
    .select()
    .single();

  if (error) {
    throw Error("Erreur lors de la création du code de connexion");
  }

  // Transforme le format Supabase -> ton modèle TypeScript
  return {
    id: inserted.id,
    code: inserted.code,
    shopID: inserted.shop_id,
    isUsed: inserted.is_used,
    expiresAt: new Date(inserted.expires_at),
    createdAt: new Date(inserted.created_at),
  };
}

import type ShopCode from "@/features/shopCode/model/ShopCode";
import { supabase } from "@/lib/supabase";

export async function checkValidity(code: string): Promise<ShopCode> {
  const { data: codeData } = await supabase
    .from("shop_codes")
    .select("*")
    .eq("code", code)
    .eq("is_used", false)
    .maybeSingle();

  if (!codeData || new Date(codeData.expires_at) < new Date()) {
    throw new Error("Code invalide ou expiré");
  }

  return codeData;
}

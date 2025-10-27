import type ShopCode from "@/features/shopCode/model/ShopCode";
import { supabase } from "@/lib/supabase";

export async function markAsUsed(code: ShopCode) {
  await supabase.from("shop_codes").update({ is_used: true }).eq("id", code.id);
}

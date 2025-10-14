import type Shop from "@/features/shop/model/Shop";
import { supabase } from "@/lib/supabase";

export async function getShop(id: string): Promise<Shop> {
  const { data } = await supabase
    .from("shops")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    throw new Error("Magasin non trouvé");
  }

  const shopData: Shop = {
    id: data.id,
    groupID: data.group_id,
    name: data.name,
    address: data.address,
    phone: data.address,
    createdAt: data.created_at,
  };

  return shopData;
}

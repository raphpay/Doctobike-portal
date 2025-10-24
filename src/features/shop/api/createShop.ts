import type Shop from "@/features/shop/model/Shop";
import { supabase } from "@/lib/supabase";

export async function createShop(
  data: Omit<Shop, "id" | "groupID" | "createdAt">
): Promise<Shop | null> {
  const { data: inserted, error } = await supabase
    .from("shops")
    .insert([
      {
        name: data.name,
        address: data.address,
        phone: data.phone,
      },
    ])
    .select()
    .single();

  if (error) {
    throw Error("Erreur lors de la création du magasin");
  }

  // Transform the Supabase format
  return {
    id: inserted.id,
    groupID: inserted.group_id,
    name: inserted.name,
    address: inserted.address,
    phone: inserted.phone,
    createdAt: new Date(inserted.created_at),
  };
}

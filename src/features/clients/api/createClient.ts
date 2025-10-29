import type User from "@/features/users/model/User";
import { supabase } from "@/lib/supabase";

export async function createClient(
  data: Omit<User, "id" | "role" | "createdAt">,
): Promise<User | null> {
  const { data: inserted, error } = await supabase
    .from("users")
    .insert([
      {
        name: data.name,
        email: data.email,
        role: "client",
        prefered_shop_id: data.preferedShopID,
      },
    ])
    .select()
    .single();

  if (error) {
    throw Error("Erreur lors de la création du client");
  }

  // Transform the Supabase format
  return {
    id: inserted.id,
    name: inserted.name,
    email: inserted.email,
    role: inserted.role,
    createdAt: new Date(inserted.created_at),
    preferedShopID: inserted.prefered_shop_id,
  };
}

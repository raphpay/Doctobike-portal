import type User from "@/features/users/model/User";
import { supabase } from "@/lib/supabase";

export async function getClients(shopID: string): Promise<User[]> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("prefered_shop_id", shopID);

  if (!data) {
    throw new Error("Utilisateurs non trouvé");
  }

  return data;
}

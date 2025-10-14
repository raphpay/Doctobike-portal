import type User from "@/features/users/model/User";
import { supabase } from "@/lib/supabase";

export async function getUser(id: string): Promise<User> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    throw new Error("Utilisateur non trouvé");
  }

  return data;
}

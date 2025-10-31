import type User from "@/features/users/model/User";
import { supabase } from "@/lib/supabase";

export async function updateUserEmail(
  id: string,
  email: string,
): Promise<User> {
  const { data: inserted, error } = await supabase
    .from("users")
    .update({ email })
    .eq("id", id)
    .select()
    .single();

  if (!inserted) {
    console.error(error);
    throw new Error("Utilisateur non trouvé");
  }

  return {
    id: inserted.id,
    name: inserted.name,
    role: inserted.role,
    email: inserted.email,
    createdAt: inserted.created_at,
  };
}

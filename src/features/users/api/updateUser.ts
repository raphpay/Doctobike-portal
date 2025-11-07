import type User from "@/features/users/model/User";
import { supabase } from "@/lib/supabase";

export async function updateUser(
  id: string,
  data: Omit<User, "id" | "email" | "createdAt">,
): Promise<User> {
  const { data: inserted, error } = await supabase
    .from("users")
    .update({ name: data.name, role: data.role })
    .eq("id", id)
    .select()
    .single();

  console.log("err", error, inserted);

  if (!inserted) {
    throw new Error("Utilisateur non trouvé");
  }

  return {
    id: inserted.id,
    name: inserted.name,
    role: inserted.role,
    email: inserted.email,
  };
}

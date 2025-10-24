import type Employee from "@/features/employees/model/Employee";
import { supabase } from "@/lib/supabase";

export async function createEmployee(
  data: Omit<Employee, "id" | "createdAt">
): Promise<Employee | null> {
  const { data: inserted, error } = await supabase
    .from("employees")
    .insert([
      {
        shop_id: data.shopID,
        user_id: data.userID,
        role_in_shop: data.roleInShop,
        full_name: data.fullName,
      },
    ])
    .select()
    .single();

  if (error) {
    throw Error("Erreur lors de la création de l'employée");
  }

  // Transform the Supabase format
  return {
    id: inserted.id,
    fullName: inserted.full_name,
    shopID: inserted.shop_id,
    userID: inserted.user_id,
    roleInShop: inserted.role_in_shop,
    createdAt: new Date(inserted.created_at),
  };
}

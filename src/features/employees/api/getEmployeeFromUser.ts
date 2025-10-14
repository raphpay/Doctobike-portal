import type Employee from "@/features/employees/model/Employee";
import { supabase } from "@/lib/supabase";

export async function getEmployeeFromUser(userID: string): Promise<Employee> {
  const { data } = await supabase
    .from("employees")
    .select("*")
    .eq("user_id", userID)
    .single();

  if (!data) {
    throw new Error("Employé non trouvé");
  }

  const employeeData: Employee = {
    id: data.id,
    userID: data.user_id,
    shopID: data.shop_id,
    roleInShop: data.role_in_shop,
    fullName: data.full_name,
    createdAt: data.created_at,
  };

  return employeeData;
}

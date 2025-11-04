import { supabase } from "@/lib/supabase";

export async function getModelsCount(brand: string) {
  const { count, error } = await supabase
    .from("bikes")
    .select("model", { count: "exact", head: true }) // `head: true` to not fetch the data, only the count
    .eq("brand", brand)
    .neq("model", null);

  if (error) {
    console.error(error);
    return 0;
  }

  return count || 0;
}

export type ModelsResponse = {
  models: string[];
  totalCount: number;
};

import { supabase } from "@/lib/supabase";

export async function getModels(brand: string, page: number) {
  const PAGE_SIZE = 40;
  const start = (page - 1) * PAGE_SIZE; // Page 1 = start 0
  const end = start + PAGE_SIZE - 1;

  const { data, count, error } = await supabase
    .from("bikes")
    .select("model", { count: "exact", head: false }) // `head: false` pour récupérer les données ET le compte
    .eq("brand", brand)
    .neq("model", null)
    .order("model", { ascending: true })
    .range(start, end);

  if (error) {
    throw error;
  }

  return {
    models: data.map((bike) => bike.model),
    totalCount: count || 0,
  };
}

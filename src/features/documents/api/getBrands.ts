import { supabase } from "@/lib/supabase";
import type Brand from "../models/Brand";

export async function getBrands(): Promise<Brand[]> {
  const { data: uniqueBrands, error } = await supabase
    .rpc("get_unique_brands")
    .order("brand", { ascending: true });

  if (error) {
    throw error;
  }

  return uniqueBrands as Brand[];
}

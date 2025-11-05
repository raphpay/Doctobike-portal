import { supabase } from "@/lib/supabase";
import type Year from "../models/Year";

export interface YearsResponse {
  years: Year[];
  totalCount: number;
}

export async function getYears(
  brand: string,
  model: string,
  page: number,
): Promise<YearsResponse> {
  const PAGE_SIZE = 12;
  const start = (page - 1) * PAGE_SIZE; // Page 1 = start 0
  const end = start + PAGE_SIZE - 1;

  const {
    data: years,
    count,
    error,
  } = await supabase
    .from("bikes")
    .select("year", { count: "exact", head: false })
    .eq("brand", brand)
    .eq("model", model)
    .neq("year", null)
    .order("year", { ascending: true })
    .range(start, end);

  if (error) {
    throw error;
  }

  return {
    years,
    totalCount: count || 0,
  } as YearsResponse;
}

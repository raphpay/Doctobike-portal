import { supabase } from "@/lib/supabase";
import type Bike from "../model/Bike";

export async function getBike(id: string): Promise<Bike> {
  const { data, error } = await supabase
    .from("bikes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Erreur lors de la récupération du vélo");
  }

  return {
    id: data.id,
    userID: data.user_id,
    model: data.model,
    brand: data.brand,
    serialNumber: data.serial_number,
    purchaseDate: new Date(data.purchase_date),
  };
}

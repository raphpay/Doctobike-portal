import { supabase } from "@/lib/supabase";
import type Bike from "../model/Bike";

export async function getClientBikes(clientID: string): Promise<Bike[] | null> {
  const { data: inserted, error } = await supabase
    .from("bikes")
    .select("*")
    .eq("user_id", clientID);

  if (error) {
    throw Error("Erreur lors de la récupération des vélos du client");
  }

  // Transform the Supabase format
  return inserted.map((bike) => ({
    id: bike.id,
    userID: bike.user_id,
    model: bike.model,
    brand: bike.brand,
    serialNumber: bike.serial_number,
    purchaseDate: new Date(bike.purchase_date),
  }));
}

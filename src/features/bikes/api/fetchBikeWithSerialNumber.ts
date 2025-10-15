import type Bike from "@/features/bikes/model/Bike";
import { supabase } from "@/lib/supabase";

export async function fetchBikeFromSerialNumber(
  serialNumber: string
): Promise<Bike | null> {
  const { data, error } = await supabase
    .from("bikes")
    .select("*")
    .eq("serial_number", serialNumber)
    .single();

  if (error) throw error;

  if (!data) {
    throw new Error("Vélo non trouvé");
  }

  const bikeData: Bike = {
    id: data.id,
    userID: data.user_id,
    model: data.model,
    brand: data.brand,
    serialNumber: data.serial_number,
    purchaseDate: data.purchase_date,
  };

  return bikeData;
}

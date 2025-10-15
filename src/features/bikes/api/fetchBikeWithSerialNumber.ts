import type Bike from "@/features/bikes/model/Bike";
import { supabase } from "@/lib/supabase";

export async function fetchBikeFromSerialNumber(
  serialNumber: string
): Promise<Bike | null> {
  const { data } = await supabase
    .from("bikes")
    .select("*")
    .eq("serial_number", serialNumber)
    .single();

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
    shopID: data.shop_id,
  };

  return bikeData;
}

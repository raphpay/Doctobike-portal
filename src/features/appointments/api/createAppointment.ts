import type Appointment from "@/features/appointments/model/Appointment";
import { supabase } from "@/lib/supabase";

export async function createAppointment(
  data: Omit<Appointment, "id" | "status" | "createdAt">
): Promise<Appointment | null> {
  const { data: inserted, error } = await supabase
    .from("appointments")
    .insert([
      {
        user_id: data.userID,
        bike_id: data.bikeID,
        shop_id: data.shopID,
        scheduled_at: data.scheduledAt,
        notes: data.notes,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log("err", error);
    throw Error("Erreur lors de la création du rendez-vous");
  }

  // Transform the Supabase format
  return {
    id: inserted.id,
    userID: inserted.user_id,
    shopID: inserted.shop_id,
    bikeID: inserted.bike_id,
    status: inserted.status,
    notes: inserted.notes,
    scheduledAt: new Date(inserted.scheduledAt),
    createdAt: new Date(inserted.created_at),
  };
}

import { supabase } from "@/lib/supabase";
import type Appointment from "../model/Appointment";
import type { AppointmentStatus } from "../model/Appointment";

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
): Promise<Appointment> {
  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Erreur lors de la mise à jour du status`);
  }

  return {
    id: data.id,
    userID: data.user_id,
    shopID: data.shop_id,
    bikeID: data.bike_id,
    scheduledAt: data.scheduled_at,
    status: data.status as AppointmentStatus,
    notes: data.notes ?? undefined,
    createdAt: data.created_at,
  };
}

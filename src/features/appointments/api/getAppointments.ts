import { supabase } from "@/lib/supabase";
import type Appointment from "../model/Appointment";
import type { AppointmentStatus } from "../model/Appointment";

export async function getAppointments(shopID: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("shop_id", shopID);

  if (error) {
    throw new Error("Erreur lors de la récupération des rendez-vous");
  }

  return data.map((item) => ({
    id: item.id,
    userID: item.user_id,
    shopID: item.shop_id,
    bikeID: item.bike_id,
    scheduledAt: new Date(item.scheduled_at),
    status: item.status as AppointmentStatus,
    notes: item.notes ?? undefined, // Convert null to undefined
    createdAt: new Date(item.created_at),
  }));
}

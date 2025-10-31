import { supabase } from "@/lib/supabase";
import type Appointment from "../model/Appointment";
import type { AppointmentStatus } from "../model/Appointment";

export async function getAppointment(rdvID: string): Promise<Appointment> {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", rdvID)
    .single();

  if (error) {
    throw new Error("Erreur lors de la récupération du rendez-vous");
  }

  return {
    id: data.id,
    userID: data.user_id,
    shopID: data.shop_id,
    bikeID: data.bike_id,
    scheduledAt: new Date(data.scheduled_at),
    status: data.status as AppointmentStatus,
    notes: data.notes ?? undefined, // Convert null to undefined
    createdAt: new Date(data.created_at),
  };
}

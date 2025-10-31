export default interface Appointment {
  id: string;
  userID: string;
  shopID: string;
  bikeID: string;
  scheduledAt: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
}

export enum AppointmentStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

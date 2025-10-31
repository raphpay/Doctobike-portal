export default interface Appointment {
  id: string;
  userID: string;
  shopID: string;
  bikeID: string;
  scheduledAt: Date;
  status: "todo" | "in-progress" | "completed";
  notes?: string;
  createdAt: Date;
}

export default interface Appointment {
  id: string;
  userID: string;
  shopID: string;
  bikeID: string;
  scheduledAt: Date;
  status: string;
  notes: string;
  createdAt: Date;
}

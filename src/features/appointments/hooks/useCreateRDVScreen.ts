import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function useCreateRDVScreen() {
  const location = useLocation();
  const { client, bikes } = location.state;

  const [selectedBikeID, setSelectedBikeID] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [rdvDate, setRDVDate] = useState<Date | undefined>(new Date());

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return {
    client,
    bikes,
    selectedBikeID,
    setSelectedBikeID,
    notes,
    setNotes,
    rdvDate,
    setRDVDate,
    handleSubmit,
  };
}

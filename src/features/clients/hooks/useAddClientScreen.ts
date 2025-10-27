import { useState } from "react";

export default function useAddClientScreen() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());

  return {
    setEmail,
    setName,
    setBrand,
    setModel,
    setSerialNumber,
    setPurchaseDate,
  };
}

import { useEffect, useState } from "react";
import type Bike from "@/features/bikes/model/Bike";
import type { ClientListItemProps } from "../components/ClientListItem";
import { getClientBikes } from "@/features/bikes/api/getClientBikes";

export default function useClientListItem({ client }: ClientListItemProps) {
  const [bikes, setBikes] = useState<Bike[]>([]);

  async function fetchBikes() {
    try {
      const bikes = await getClientBikes(client.id);
      setBikes(bikes ?? []);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des vélos du client",
        error,
      );
    }
  }

  useEffect(() => {
    fetchBikes();
  }, [client]);

  return { bikes };
}

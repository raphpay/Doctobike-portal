import { useClientsQuery } from "@/features/clients/hooks/useClients";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import type User from "@/features/users/model/User";
import { useState } from "react";

export default function useSelectClientScreen() {
  const { data, error, isLoading } = useClientsQuery();

  return { data, error, isLoading };
}

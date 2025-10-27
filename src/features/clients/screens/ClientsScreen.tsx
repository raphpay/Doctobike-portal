import AppContainer from "@/shared/components/AppContainer";
import { Button } from "@/shared/components/ui/button";
import * as React from "react";
import useClientsScreen from "../hooks/useClientsScreen";

export default function ClientsScreen() {
  const { tapOnAddClient } = useClientsScreen();
  return (
    <AppContainer>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex w-full justify-end">
          <Button onClick={tapOnAddClient}>Ajouter un client</Button>
        </div>
        Content
      </div>
    </AppContainer>
  );
}

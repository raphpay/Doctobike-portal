import AppContainer from "@/shared/components/AppContainer";
import useClientScreen from "../hooks/useClientScreen";
import LabelInput from "@/shared/components/ui/label-input";
import { Button } from "@/shared/components/ui/button";
import type Bike from "@/features/bikes/model/Bike";
import { formatDate } from "@/shared/utils/dates";
import ClientBikeListItem from "../components/ClientBikeListItem";

export default function ClientScreen() {
  const { client, bikes } = useClientScreen();

  return (
    <AppContainer>
      <div className="flex flex-col p-4 gap-4">
        <h1 className="text-start font-semibold text-4xl">{client.name}</h1>

        <div className="w-1/2 flex flex-col justify-start gap-4">
          <LabelInput
            label="Email"
            type="text"
            disabled={true}
            value={client.email}
            onChange={() => console.log("")}
          />

          <Button className="w-fit" variant="secondary">
            Modifier
          </Button>
        </div>

        <div className="grid grid-cols-4">
          {bikes && bikes.length > 0 ? (
            bikes.map((bike: Bike) => {
              return <ClientBikeListItem key={bike.id} bike={bike} />;
            })
          ) : (
            <p className="text-center">No bikes found</p>
          )}
        </div>
      </div>
    </AppContainer>
  );
}

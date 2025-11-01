import AppContainer from "@/shared/components/AppContainer";
import BackButton from "@/shared/components/BackButton";
import useCreateRDVScreen from "../hooks/useCreateRDVScreen";
import TopMainContainerBar from "@/shared/components/TopMainContainerBar";
import { Button } from "@/shared/components/ui/button";
import type Bike from "@/features/bikes/model/Bike";
import Card from "@/shared/components/Card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import LabelTextArea from "@/shared/components/ui/label-text-area";
import DatePicker from "@/shared/components/ui/date-picker";

export default function CreateRDVScreen() {
  const {
    client,
    bikes,
    selectedBikeID,
    setSelectedBikeID,
    notes,
    setNotes,
    rdvDate,
    setRDVDate,
    handleSubmit,
  } = useCreateRDVScreen();

  return (
    <AppContainer>
      <div className="flex flex-col w-full h-full p-4 justify-between">
        <div className="flex flex-col gap-4">
          <TopMainContainerBar title={`${client.name} - RDV`} />

          <div className="grid grid-cols-4">
            {bikes &&
              bikes.map((bike: Bike) => {
                const isSelected = selectedBikeID === bike.id;

                return (
                  <Card extraClassName={isSelected ? "bg-main" : ""}>
                    <div
                      key={bike.id}
                      className="flex gap-2 justify-between w-full items-center"
                    >
                      <div className="flex gap-2">
                        <h3>{bike.brand}</h3>
                        <p>{bike.model}</p>
                      </div>
                      <Checkbox
                        onClick={() =>
                          setSelectedBikeID(isSelected ? null : bike.id)
                        }
                      />
                    </div>
                  </Card>
                );
              })}
          </div>

          <LabelTextArea
            label="Notes du RDV"
            value={notes}
            onChange={setNotes}
          />

          <DatePicker date={rdvDate} onChange={(val) => setRDVDate(val)} />
        </div>

        <div className="flex w-full justify-end gap-4">
          <BackButton />
          <Button onClick={handleSubmit}>Valider</Button>
        </div>
      </div>
    </AppContainer>
  );
}

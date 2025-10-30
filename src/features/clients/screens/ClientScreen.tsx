import AppContainer from "@/shared/components/AppContainer";
import useClientScreen from "../hooks/useClientScreen";
import LabelInput from "@/shared/components/ui/label-input";
import { Button } from "@/shared/components/ui/button";
import type Bike from "@/features/bikes/model/Bike";
import ClientBikeListItem from "../components/ClientBikeListItem";

export default function ClientScreen() {
  const {
    client,
    isModifying,
    bikes,
    goBack,
    goToBikeCreation,
    setIsModifying,
    newEmail,
    saveNewMail,
    handleEmailChange,
    isEmailDifferent,
  } = useClientScreen();

  return (
    <AppContainer>
      <div className="flex flex-col h-full p-4 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-start font-semibold text-4xl">{client.name}</h1>
            <Button onClick={goToBikeCreation}>Ajouter un vélo</Button>
          </div>

          <div className="w-1/2 flex flex-col justify-start gap-4">
            <LabelInput
              label="Email"
              type="text"
              disabled={!isModifying}
              value={isModifying ? newEmail : client.email}
              onChange={(val) => handleEmailChange(val)}
            />

            <div className="flex gap-4">
              <Button
                onClick={() => setIsModifying(!isModifying)}
                className="w-fit"
                variant="secondary"
              >
                {isModifying ? "Annuler" : "Modifier"}
              </Button>
              {isModifying && (
                <Button disabled={!isEmailDifferent} onClick={saveNewMail}>
                  Sauvegarder
                </Button>
              )}
            </div>
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

        <div className="w-full flex justify-end">
          <Button onClick={goBack} className="w-fit" variant="secondary">
            Retour
          </Button>
        </div>
      </div>
    </AppContainer>
  );
}

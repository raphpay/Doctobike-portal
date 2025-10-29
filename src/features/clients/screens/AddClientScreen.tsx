import AppContainer from "@/shared/components/AppContainer";
import LabelInput from "@/shared/components/ui/label-input";
import useAddClientScreen from "../hooks/useAddClientScreen";
import { Button } from "@/shared/components/ui/button";
import DatePicker from "@/shared/components/ui/date-picker";
import { Label } from "@/shared/components/ui/label";

export default function AddClientScreen() {
  const {
    isSubmitDisabled,
    bikeFormData,
    clientErrors,
    bikeErrors,
    handleClientFormDataChange,
    handleBikeFormDataChange,
    addClient,
  } = useAddClientScreen();
  return (
    <AppContainer>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex w-full justify-start">
          <h1 className="font-semibold text-3xl">Ajouter un client</h1>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
          <LabelInput
            id="email"
            type="email"
            label="Email du client"
            onChange={(val) => handleClientFormDataChange("email", val)}
            error={clientErrors.email}
          />
          <LabelInput
            id="name"
            label="Nom du client"
            onChange={(val) => handleClientFormDataChange("name", val)}
            error={clientErrors.name}
          />
          <LabelInput
            id="brand"
            label="Marque du vélo"
            onChange={(val) => handleBikeFormDataChange("brand", val)}
            error={bikeErrors.brand}
          />
          <LabelInput
            id="model"
            label="Modèle du vélo"
            onChange={(val) => handleBikeFormDataChange("model", val)}
            error={bikeErrors.model}
          />
          <LabelInput
            id="serialNumber"
            label="Numéro de série du vélo"
            onChange={(val) => handleBikeFormDataChange("serialNumber", val)}
            error={bikeErrors.serialNumber}
          />
          <div className="flex flex-col gap-2 items-start">
            <Label>Date d'achat</Label>
            <DatePicker
              date={
                bikeFormData.purchaseDate
                  ? new Date(bikeFormData.purchaseDate)
                  : undefined
              }
              onChange={(val) => handleBikeFormDataChange("purchaseDate", val)}
            />
          </div>
        </form>

        <div className="flex w-full justify-end">
          <Button disabled={isSubmitDisabled} onClick={addClient}>
            Valider
          </Button>
        </div>
      </div>
    </AppContainer>
  );
}

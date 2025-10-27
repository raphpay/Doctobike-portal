import AppContainer from "@/shared/components/AppContainer";
import LabelInput from "@/shared/components/ui/label-input";
import useAddClientScreen from "../hooks/useAddClientScreen";
import { Button } from "@/shared/components/ui/button";
import DatePicker from "@/shared/components/ui/date-picker";
import { Label } from "@/shared/components/ui/label";

export default function AddClientScreen() {
  const {
    purchaseDate,
    setEmail,
    setName,
    setBrand,
    setModel,
    setSerialNumber,
    setPurchaseDate,
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
            onChangeCapture={setEmail}
          />
          <LabelInput
            id="name"
            label="Nom du client"
            onChangeCapture={setName}
          />
          <LabelInput
            id="brand"
            label="Marque du vélo"
            onChangeCapture={setBrand}
          />
          <LabelInput
            id="model"
            label="Modèle du vélo"
            onChangeCapture={setModel}
          />
          <LabelInput
            id="serialNumber"
            label="Numéro de série du vélo"
            onChangeCapture={setSerialNumber}
          />
          <div className="flex flex-col gap-2 items-start">
            <Label>Date d'achat</Label>
            <DatePicker date={purchaseDate} onChange={setPurchaseDate} />
          </div>
        </form>

        <div className="flex w-full justify-end">
          <Button>Valider</Button>
        </div>
      </div>
    </AppContainer>
  );
}

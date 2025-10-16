import useCreateBikeDialog from "@/features/appointments/hooks/useCreateBikeDialog";
import Dialog from "@/shared/components/Dialog";
import { Button } from "@/shared/components/ui/button";
import { DatePickerWithInput } from "@/shared/components/ui/date-picker-with-input";
import { InputWithLabel } from "@/shared/components/ui/input-with-label";

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const CreateBikeDialog = ({ isOpen, onConfirm, onCancel }: Props) => {
  const {
    formData,
    errors,
    isSubmitDisabled,
    purchaseDate,
    setPurchaseDate,
    handleFormDataChange,
    tapOnSubmit,
  } = useCreateBikeDialog({ onCancel });

  return (
    <Dialog
      isOpen={isOpen}
      title="Créer un vélo pour le client"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <div className="flex flex-col w-full h-full gap-4">
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <InputWithLabel
              label={"Marque"}
              value={formData.brand}
              onChange={(e) =>
                handleFormDataChange("brand", e.currentTarget.value)
              }
              error={errors.brand}
            />
            <InputWithLabel
              label={"Modèle"}
              value={formData.model}
              onChange={(e) =>
                handleFormDataChange("model", e.currentTarget.value)
              }
              error={errors.model}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputWithLabel
              label={"test"}
              value={formData.serialNumber}
              onChange={(e) =>
                handleFormDataChange("serialNumber", e.currentTarget.value)
              }
              error={errors.serialNumber}
            />
            <DatePickerWithInput
              label={"Date d'achat"}
              value={purchaseDate}
              setValue={setPurchaseDate}
              error={errors.purchaseDate}
            />
          </div>
          <Button
            type="button"
            onClick={tapOnSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default CreateBikeDialog;

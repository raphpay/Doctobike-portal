import Dialog from "@/shared/components/Dialog";

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const CreateBikeDialog = ({ isOpen, onConfirm, onCancel }: Props) => {
  return (
    <Dialog
      isOpen={isOpen}
      title="Créer un vélo pour le client"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default CreateBikeDialog;

import { formatDate } from "@/shared/utils/Dates";
import { useState } from "react";

type BikeFormData = {
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate?: string;
};

type BikeFormErrors = {
  [K in keyof BikeFormData]?: string;
};

type Props = {
  onCancel: () => void;
};

export default function useCreateBikeDialog({ onCancel }: Props) {
  const [formData, setFormData] = useState<BikeFormData>({
    brand: "",
    model: "",
    serialNumber: "",
  });
  const [errors, setErrors] = useState<BikeFormErrors>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [purchaseDate, setPurchaseDate] = useState<string>(
    formatDate(new Date())
  );

  function validateForm(): boolean {
    const newErrors: BikeFormErrors = {};

    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.serialNumber.trim())
      newErrors.serialNumber = "Serial number is required";
    if (!purchaseDate) newErrors.purchaseDate = "Purchase date is required";

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  }

  function handleFormDataChange<K extends keyof BikeFormData>(
    field: K,
    value: BikeFormData[K]
  ) {
    setFormData((prev: any) => ({ ...prev, [field]: value }));

    // Clear that field's error
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function tapOnSubmit() {
    setIsSubmitDisabled(true);
    const isValid = validateForm();
    if (!isValid) {
      console.log("no");
      //   toast.error("Please fill all required fields");
      //   setIsSubmitDisabled(false);
      setIsSubmitDisabled(false);
      return;
    }

    setIsSubmitDisabled(false);
    // if (user) {
    //   try {
    //     await createBike({
    //       userID: user.id,
    //       brand: formData.brand,
    //       model: formData.model,
    //       serialNumber: formData.serialNumber,
    //       purchaseDate: new Date(),
    //     });
    //     toast.success("Vélo enregistré");
    //     setFormData({
    //       brand: "",
    //       model: "",
    //       serialNumber: "",
    //       purchaseDate: new Date(),
    //     });
    //     setErrors({});
    //     setTimeout(() => {
    //       onCancel();
    //     }, 2000);
    //   } catch (error) {
    //     const message = (error as Error).message;
    //     toast.error(message);
    //   }
    // }
    // setIsSubmitDisabled(false);
  }

  return {
    formData,
    errors,
    isSubmitDisabled,
    purchaseDate,
    setPurchaseDate,
    handleFormDataChange,
    tapOnSubmit,
  };
}

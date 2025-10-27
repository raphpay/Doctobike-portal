import { isEmailValid } from "@/shared/utils/validation";
import { useState } from "react";
import { createClient } from "../api/createClient";

import { createBike } from "@/features/bikes/api/createBike";
import { toast } from "react-toastify";
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useShopQuery } from "@/features/shop/hooks/useShop";

type ClientFormData = {
  email: string;
  name: string;
};

type ClientFormErrors = {
  [K in keyof ClientFormData]?: string;
};

type BikeFormData = {
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: Date | undefined;
};

type BikeFormErrors = {
  [K in keyof BikeFormData]?: string;
};

export default function useAddClientScreen() {
  const { data: shop } = useShopQuery();
  const { navigate } = useNavigationStack();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [clientFormData, setClientFormData] = useState<ClientFormData>({
    email: "",
    name: "",
  });
  const [clientErrors, setClientErrors] = useState<ClientFormErrors>({});
  const [bikeFormData, setBikeFormData] = useState<BikeFormData>({
    brand: "",
    model: "",
    serialNumber: "",
    purchaseDate: new Date(),
  });
  const [bikeErrors, setBikeErrors] = useState<BikeFormErrors>({});

  function validateClientForm(): boolean {
    const newErrors: ClientFormErrors = {};

    if (!clientFormData.email.trim())
      newErrors.email = "L'email est requis is required";
    if (!clientFormData.name.trim())
      newErrors.name = "Le nom est requis is required";
    if (!isEmailValid(clientFormData.email))
      newErrors.email = "L'email est invalide";

    setClientErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  }

  function validateBikeForm(): boolean {
    const newErrors: BikeFormErrors = {};

    console.log("test", bikeFormData);
    if (!bikeFormData.brand.trim()) newErrors.brand = "La marque est requise";
    if (!bikeFormData.model.trim()) newErrors.model = "Le modèle est requis";
    if (!bikeFormData.serialNumber.trim())
      newErrors.serialNumber = "Le numéro de série est requis";

    setBikeErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  }

  function handleClientFormDataChange<K extends keyof ClientFormData>(
    field: K,
    value: ClientFormData[K],
  ) {
    setClientFormData((prev: ClientFormData) => ({ ...prev, [field]: value }));

    // Clear that field's error
    setClientErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleBikeFormDataChange<K extends keyof BikeFormData>(
    field: K,
    value: BikeFormData[K],
  ) {
    setBikeFormData((prev: BikeFormData) => ({ ...prev, [field]: value }));

    // Clear that field's error
    setBikeErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function addClient() {
    setIsSubmitDisabled(true);
    const isClientFormValid = validateClientForm();
    const isBikeFormValid = validateBikeForm();

    if (isClientFormValid && isBikeFormValid && shop) {
      try {
        const client = await createClient({
          name: clientFormData.name,
          email: clientFormData.email,
          preferedShopID: shop.id,
        });

        if (client) {
          await createBike({
            serialNumber: bikeFormData.serialNumber,
            brand: bikeFormData.brand,
            model: bikeFormData.model,
            purchaseDate: bikeFormData.purchaseDate ?? new Date(),
            userID: client.id,
          });

          setClientFormData({
            email: "",
            name: "",
          });
          setBikeFormData({
            serialNumber: "",
            brand: "",
            model: "",
            purchaseDate: new Date(),
          });

          toast.success("Client ajouté avec succès");

          setTimeout(() => {
            navigate(NavigationRoutes.CLIENTS);
          }, 2000);
        }
      } catch (error) {
        const message = (error as Error).message;
        toast.error(message);
      } finally {
        setIsSubmitDisabled(false);
      }
    } else {
      setIsSubmitDisabled(false);
    }
  }

  return {
    isSubmitDisabled,
    bikeFormData,
    clientErrors,
    bikeErrors,
    handleClientFormDataChange,
    handleBikeFormDataChange,
    addClient,
  };
}

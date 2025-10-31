import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { updateUserEmail } from "@/features/users/api/updateUserEmail";
import { isEmailValid } from "@/shared/utils/validation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useClientQuery } from "./useClientQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CacheKeys from "@/features/cache/model/CacheKeys";

export default function useClientScreen() {
  const location = useLocation();
  const { navigate, goBack } = useNavigationStack();
  const queryClient = useQueryClient();
  const { id, bikes } = location.state;

  const { data: client, isLoading, error } = useClientQuery({ id });

  const [newEmail, setNewEmail] = useState<string>(client?.email || "");
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [isEmailDifferent, setIsEmailDifferent] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  function goToBikeCreation() {
    navigate(NavigationRoutes.ADD_BIKE);
  }

  const mutation = useMutation({
    mutationFn: ({ userId, newEmail }: { userId: string; newEmail: string }) =>
      updateUserEmail(userId, newEmail),
    onSuccess: () => {
      // Invalidate the request to force a data reload
      queryClient.invalidateQueries({
        queryKey: [`${CacheKeys.CLIENT}-${id}`],
      });
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  async function saveNewMail() {
    if (!isEmailDifferent) {
      return;
    }

    setIsSubmitDisabled(true);

    try {
      if (!isEmailValid(newEmail)) {
        setEmailError("Adresse email invalide");
        return;
      }

      await mutation.mutateAsync({ userId: client?.id ?? "", newEmail });
      setIsModifying(false);
      setEmailError(undefined);
      setIsEmailDifferent(false);
    } finally {
      setIsSubmitDisabled(false);
    }
  }

  function handleEmailChange(email: string) {
    setNewEmail(email);
    setIsEmailDifferent(email !== client?.email);
  }

  useEffect(() => {
    if (client) {
      setNewEmail(client.email);
    }
  }, [client]);

  useEffect(() => {
    setIsSubmitDisabled(!isEmailDifferent);
  }, [isEmailDifferent]);

  return {
    client,
    isLoading,
    error,
    isModifying,
    bikes,
    goBack,
    goToBikeCreation,
    setIsModifying,
    newEmail,
    saveNewMail,
    handleEmailChange,
    emailError,
    isSubmitDisabled,
  };
}

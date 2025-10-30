import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function useClientScreen() {
  const location = useLocation();
  const { navigate, goBack } = useNavigationStack();
  const { client, bikes } = location.state;

  const [newEmail, setNewEmail] = useState<string>(client.email);
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [isEmailDifferent, setIsEmailDifferent] = useState<boolean>(false);

  function goToBikeCreation() {
    navigate(NavigationRoutes.ADD_BIKE);
  }

  function saveNewMail() {
    // TODO: Implement saveNewMail function
  }

  function handleEmailChange(email: string) {
    setNewEmail(email);
    setIsEmailDifferent(email !== client.email);
  }

  return {
    client,
    bikes,
    goBack,
    goToBikeCreation,
    isModifying,
    setIsModifying,
    newEmail,
    handleEmailChange,
    isEmailDifferent,
    saveNewMail,
  };
}

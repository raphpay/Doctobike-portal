import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import { Button } from "./ui/button";

export default function BackButton() {
  const { goBack } = useNavigationStack();

  return (
    <Button onClick={goBack} className="w-fit" variant="secondary">
      Retour
    </Button>
  );
}

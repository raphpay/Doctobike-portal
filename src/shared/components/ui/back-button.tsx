import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import { Button } from "./button";

export default function BackButton() {
  const { goBack } = useNavigationStack();

  return (
    <div className="w-full flex justify-end">
      <Button onClick={goBack} className="w-fit" variant="secondary">
        Retour
      </Button>
    </div>
  );
}

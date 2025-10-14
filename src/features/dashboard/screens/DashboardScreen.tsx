import useDashboardScreen from "@/features/dashboard/hooks/useDashboardScreen";
import { Button } from "@/shared/components/ui/button";
import { IconCopy } from "@tabler/icons-react";

const DashboardScreen = () => {
  const { shopCode, handleLogOut, handleShopCodeCreation, handleCopy } =
    useDashboardScreen();

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1>Dashboard screen</h1>

      <Button onClick={handleShopCodeCreation}>Créer un code shop</Button>

      {shopCode && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <p>Code de connexion {shopCode.code}</p>
            <Button onClick={handleCopy}>
              <IconCopy />
            </Button>
          </div>
          <p>Utilisable qu'une seule fois</p>
        </div>
      )}

      <Button onClick={handleLogOut}>Déconnexion</Button>
    </div>
  );
};

export default DashboardScreen;

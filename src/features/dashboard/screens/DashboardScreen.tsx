import { signOut } from "@/features/auth/api/signOut";
import { Button } from "@/shared/components/ui/button";

const DashboardScreen = () => {
  async function handleLogOut() {
    await signOut();
  }

  return (
    <div>
      <h1>Dashboard screen</h1>

      <Button onClick={handleLogOut}>Déconnexion</Button>
    </div>
  );
};

export default DashboardScreen;

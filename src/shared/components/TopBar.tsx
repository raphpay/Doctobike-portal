import NavigationRoutes from "../../features/navigation/model/NavigationRoutes";
import useTopBar from "./hooks/useTopBar";
import TextButton from "./ui/text-button";

export default function TopBar() {
  const { handleNavigation } = useTopBar();

  return (
    <div className="w-screen bg-secondary-background border-black border-b-4 flex justify-between items-center p-4">
      <h1
        onClick={() => handleNavigation(NavigationRoutes.DASHBOARD)}
        className="cursor-pointer font-semibold text-4xl"
      >
        Doctobike
      </h1>

      <div className="flex items-center gap-4">
        <TextButton
          title="Aide"
          onClick={() => handleNavigation(NavigationRoutes.HELP)}
        />
        <TextButton
          title="A propos"
          onClick={() => handleNavigation(NavigationRoutes.ABOUT)}
        />
        <TextButton
          title="Compte"
          onClick={() => handleNavigation(NavigationRoutes.ACCOUNT)}
        />
      </div>
    </div>
  );
}

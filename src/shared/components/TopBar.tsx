import NavigationRoutes from "../../features/navigation/model/NavigationRoutes";
import useTopBar from "./hooks/useTopBar";

export default function TopBar() {
  const { handleNavigation } = useTopBar();

  function TextButton({
    title,
    destination,
  }: {
    title: string;
    destination: string;
  }) {
    return (
      <button
        onClick={() => handleNavigation(destination)}
        className="hover:underline cursor-pointer text-2xl"
      >
        {title}
      </button>
    );
  }

  return (
    <div className="w-screen bg-chart-2 flex justify-between items-center p-4">
      <h1 className="font-semibold text-4xl">Doctobike</h1>

      <div className="flex items-center gap-4">
        <TextButton title="Aide" destination={NavigationRoutes.HELP} />
        <TextButton title="A propos" destination={NavigationRoutes.ABOUT} />
        <TextButton title="Compte" destination={NavigationRoutes.ACCOUNT} />
      </div>
    </div>
  );
}

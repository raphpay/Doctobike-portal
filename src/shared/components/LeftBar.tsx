import TextButton from "./ui/text-button";
import useLeftBar from "./hooks/useLeftBar";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";

export default function LeftBar() {
  const { handleNavigation } = useLeftBar();

  return (
    <div className="w-1/5 bg-chart-3 flex flex-col p-2 gap-4">
      <TextButton
        title="Home"
        onClick={() => handleNavigation(NavigationRoutes.DASHBOARD)}
      />
      <TextButton
        title="Clients"
        onClick={() => handleNavigation(NavigationRoutes.CLIENTS)}
      />
      <TextButton
        title="Documents techniques"
        onClick={() => handleNavigation(NavigationRoutes.TECHNICAL_DOCUMENTS)}
      />
      <TextButton
        title="Rendez-vous"
        onClick={() => handleNavigation(NavigationRoutes.RDV)}
      />
    </div>
  );
}

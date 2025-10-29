import TextButton from "./ui/text-button";
import useLeftBar from "./hooks/useLeftBar";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import LeftBarButton from "./ui/leftbar-button";

export default function LeftBar() {
  const { handleNavigation } = useLeftBar();

  return (
    <div className="w-1/5 bg-secondary-background border-b border-r-6 border-black flex flex-col">
      <LeftBarButton
        title="Home"
        onClick={() => handleNavigation(NavigationRoutes.DASHBOARD)}
      />
      <LeftBarButton
        title="Clients"
        onClick={() => handleNavigation(NavigationRoutes.CLIENTS)}
      />
      <LeftBarButton
        title="Documents techniques"
        onClick={() => handleNavigation(NavigationRoutes.TECHNICAL_DOCUMENTS)}
      />
      <LeftBarButton
        title="Rendez-vous"
        onClick={() => handleNavigation(NavigationRoutes.RDV)}
      />
    </div>
  );
}

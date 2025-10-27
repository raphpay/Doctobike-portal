import useDashboardScreen from "@/features/dashboard/hooks/useDashboardScreen";
import { Button } from "@/shared/components/ui/button";
import { IconCopy } from "@tabler/icons-react";
import { ToastContainer } from "react-toastify";
import AppContainer from "@/shared/components/AppContainer";

const DashboardScreen = () => {
  const { shopCode, handleLogOut, handleShopCodeCreation, handleCopy } =
    useDashboardScreen();

  return (
    <AppContainer>
      <div className="flex justify-center items-center h-full">
        <h1>Dashboard</h1>
      </div>g
    </AppContainer>
  );
};

export default DashboardScreen;

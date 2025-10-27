import useDashboardScreen from "@/features/dashboard/hooks/useDashboardScreen";
import { Button } from "@/shared/components/ui/button";
import { IconCopy } from "@tabler/icons-react";
import { ToastContainer } from "react-toastify";
import Appcontainer from "@/shared/components/AppContainer";

const DashboardScreen = () => {
  const { shopCode, handleLogOut, handleShopCodeCreation, handleCopy } =
    useDashboardScreen();

  return <Appcontainer>Hello World!</Appcontainer>;
};

export default DashboardScreen;

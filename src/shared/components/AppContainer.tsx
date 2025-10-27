import { ToastContainer } from "react-toastify";
import TopBar from "@/shared/components/TopBar";
import LeftBar from "./LeftBar";

interface Props {
  children: React.ReactNode;
}

export default function AppContainer({ children }: Props) {
  return (
    <div className="flex flex-col w-screen h-screen">
      <TopBar />

      <div className="w-screen h-screen flex gap-2">
        <LeftBar />

        <div className="w-full">{children}</div>
      </div>

      <ToastContainer />
    </div>
  );
}

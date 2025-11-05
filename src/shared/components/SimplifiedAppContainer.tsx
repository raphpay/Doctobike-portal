import { ToastContainer } from "react-toastify";
import TopBar from "@/shared/components/TopBar";

interface Props {
  children: React.ReactNode;
}

export default function SimplifiedAppContainer({ children }: Props) {
  return (
    <div className="flex flex-col w-screen h-screen ">
      <TopBar />

      <div className="w-screen h-screen flex gap-2 p-4">
        <div className="w-full">{children}</div>
      </div>

      <ToastContainer />
    </div>
  );
}

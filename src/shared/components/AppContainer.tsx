import { ToastContainer } from "react-toastify";
import TopBar from "@/shared/components/TopBar";

interface Props {
  content: React.ReactNode;
}

export default function Appcontainer({ content }: Props) {
  return (
    <div className="flex flex-col w-screen h-screen">
      <TopBar />

      <div className="w-screen h-screen flex gap-2">
        <div className="w-1/5 bg-chart-3 flex flex-col p-2">Left Bar</div>

        {content}
      </div>

      <ToastContainer />
    </div>
  );
}

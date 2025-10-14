import App from "@/app/App";
import { NavigationStackProvider } from "@/features/navigation/context/NavigationStackContext";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NavigationStackProvider>
      <App />
    </NavigationStackProvider>
  </BrowserRouter>
);

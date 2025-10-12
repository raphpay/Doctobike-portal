import App from "@/app/App";
import { NavigationStackProvider } from "@/features/navigation/context/NavigationStackContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavigationStackProvider>
        <App />
      </NavigationStackProvider>
    </BrowserRouter>
  </StrictMode>
);

import App from "@/app/App";
import { NavigationStackProvider } from "@/features/navigation/context/NavigationStackContext";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <NavigationStackProvider>
        <App />
      </NavigationStackProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);

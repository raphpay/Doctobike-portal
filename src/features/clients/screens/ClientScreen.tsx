import AppContainer from "@/shared/components/AppContainer";
import { useLocation } from "react-router-dom";

export default function ClientScreen() {
  const location = useLocation();

  // Constants
  const { id } = location.state;

  return (
    <AppContainer>
      <div>{id}</div>
    </AppContainer>
  );
}

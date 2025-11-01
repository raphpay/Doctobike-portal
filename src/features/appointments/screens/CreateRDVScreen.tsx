import AppContainer from "@/shared/components/AppContainer";
import BackButton from "@/shared/components/BackButton";
import { useLocation } from "react-router-dom";

export default function CreateRDVScreen() {
  const location = useLocation();
  const { client, bikes } = location.state;

  return (
    <AppContainer>
      <div>Hello</div>
      <BackButton />
    </AppContainer>
  );
}

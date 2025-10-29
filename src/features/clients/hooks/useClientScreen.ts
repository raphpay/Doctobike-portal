import { useLocation } from "react-router-dom";

export default function useClientScreen() {
  const location = useLocation();

  const { client, bikes } = location.state;

  return { client, bikes };
}

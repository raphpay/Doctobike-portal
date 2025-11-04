import AppContainer from "@/shared/components/AppContainer";
import * as React from "react";
import { useParams } from "react-router-dom";

export default function ModelsPage() {
  const { brand } = useParams<{ brand: string }>();

  console.log("brand", brand);

  return <AppContainer>Models Page</AppContainer>;
}

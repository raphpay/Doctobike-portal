// Dans `useModelsPage.ts`
import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import { useModelsQuery } from "./useModelsQuery";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function useModelsPage() {
  const { brand } = useParams<{ brand: string }>();
  const [page, setPage] = useState<number>(1);
  const { data, totalCount, error, isLoading } = useModelsQuery({
    brand: brand!,
    page,
  });

  const { navigate } = useNavigationStack();

  const totalPages = totalCount ? Math.ceil(totalCount / 10) : 0;

  function selectModel(model: string) {
    navigate(
      `${NavigationRoutes.TECHNICAL_DOCUMENTS}/${brand}/${model}`,
      `${model}`,
    );
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  function previousPage() {
    setPage(Math.max(1, page - 1)); // Page minimum = 1
  }

  return {
    data,
    totalCount,
    totalPages,
    error,
    isLoading,
    page,
    selectModel,
    nextPage,
    previousPage,
  };
}

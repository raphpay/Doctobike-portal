import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { useYearsQuery } from "./useYearsQuery";
import { useParams } from "react-router-dom";
import { useState } from "react";
import type Year from "../models/Year";

export default function useYearsPage() {
  const { brand, model } = useParams<{ brand: string; model: string }>();
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading, totalCount } = useYearsQuery({
    brand: brand!,
    model: model!,
    page,
  });

  const { navigate } = useNavigationStack();

  const totalPages = totalCount ? Math.ceil(totalCount / 10) : 0;

  function selectYear(year: Year) {
    navigate(
      `${NavigationRoutes.TECHNICAL_DOCUMENTS}/${brand}/${model}/${year.year}`,
      `${year.year}`,
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
    error,
    isLoading,
    selectYear,
    totalCount,
    totalPages,
    nextPage,
    previousPage,
    page,
    brand,
    model,
  };
}

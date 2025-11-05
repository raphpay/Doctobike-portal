import { useDocumentsQuery } from "./useDocumentsQuery";
import { useParams } from "react-router-dom";
import { useState } from "react";
import type { Document } from "../models/Document";

export default function useDocumentsPage() {
  const { brand, model, year } = useParams<{
    brand: string;
    model: string;
    year: string;
  }>();

  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading, totalCount } = useDocumentsQuery({
    brand: brand!,
    model: model!,
    year: year!,
    page,
  });

  const totalPages = totalCount ? Math.ceil(totalCount / 10) : 0;

  function selectDocument(document: Document) {
    console.log("display doc", document);
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
    selectDocument,
    brand,
    model,
    year,
    nextPage,
    previousPage,
  };
}

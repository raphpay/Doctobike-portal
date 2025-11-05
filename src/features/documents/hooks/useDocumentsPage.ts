import { useDocumentsQuery } from "./useDocumentsQuery";
import { useParams } from "react-router-dom";
import { useState } from "react";
import type { Document } from "../models/Document";
import { getDocumentSignedUrl } from "../api/getDocumentSignedUrl";

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

  async function selectDocument(document: Document) {
    const documentId = document.id;
    try {
      const url = await getDocumentSignedUrl(documentId);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Erreur lors de la génération du lien:", err);
      alert("Impossible d'ouvrir le document");
    }
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
    nextPage,
    previousPage,
  };
}

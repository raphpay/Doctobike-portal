import { useQuery } from "@tanstack/react-query";
import {
  getDocuments,
  type DocumentResponse,
} from "@/features/documents/api/getDocuments";
import CacheKeys from "@/features/cache/model/CacheKeys";

export function useDocumentsQuery({
  brand,
  model,
  year,
  page,
}: {
  brand: string;
  model: string;
  year: string;
  page: number;
}) {
  const query = useQuery<DocumentResponse, Error>({
    queryKey: [CacheKeys.DOCUMENTS, brand, model, year, page],
    queryFn: () => getDocuments(brand, model, year, page),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data?.documents || [],
    totalCount: query.data?.totalCount || 0,
  };
}

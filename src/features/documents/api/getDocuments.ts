import { supabase } from "@/lib/supabase";
import type { Document } from "@/features/documents/models/Document";

export type DocumentResponse = {
  documents: Document[];
  totalCount: number;
};

export async function getDocuments(
  brand: string,
  model: string,
  year: string,
  page: number,
): Promise<DocumentResponse> {
  const PAGE_SIZE = 40;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  const { data: bike, error: bikeError } = await supabase
    .from("bikes")
    .select("*")
    .eq("brand", brand)
    .eq("model", model)
    .eq("year", year)
    .single();

  if (bikeError) {
    throw bikeError;
  }

  if (!bike) {
    throw new Error("Vélo non trouvé");
  }

  const {
    data: documents,
    count,
    error: documentError,
  } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: false })
    .eq("bike_id", bike.id)
    .range(start, end);

  if (documentError) {
    throw documentError;
  }

  const formattedDocuments: Document[] =
    documents?.map((doc) => ({
      id: doc.id,
      bikeID: doc.bike_id,
      name: doc.name,
      type: doc.type,
      path: doc.path,
      createdAt: new Date(doc.created_at),
    })) || [];

  return {
    documents: formattedDocuments,
    totalCount: count || 0,
  };
}

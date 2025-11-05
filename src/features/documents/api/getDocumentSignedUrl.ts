import { supabase } from "@/lib/supabase";

export async function getDocumentSignedUrl(
  documentId: string,
): Promise<string> {
  const { data: document, error: documentError } = await supabase
    .from("documents")
    .select("path")
    .eq("id", documentId)
    .single();

  if (documentError || !document?.path) {
    throw new Error("Document non trouvé");
  }

  const { data: signedUrl, error: urlError } = await supabase.storage
    .from("bike-documents")
    .createSignedUrl(document.path, 3600);

  if (urlError || !signedUrl) {
    throw new Error("Impossible de générer le lien");
  }

  return signedUrl.signedUrl;
}

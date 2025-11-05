import useDocumentsPage from "../hooks/useDocumentsPage";
import { Button } from "@/shared/components/ui/button";
import { IconFileTypePdf } from "@tabler/icons-react";
import SimplifiedAppContainer from "@/shared/components/SimplifiedAppContainer";
import Breadcrumb from "@/shared/components/Breadcrumb";
import BackButton from "@/shared/components/ui/back-button";

export default function DocumentsPage() {
  const {
    data: documents,
    error,
    isLoading,
    selectDocument,
    brand,
    model,
    year,
  } = useDocumentsPage();

  if (isLoading) {
    return (
      <SimplifiedAppContainer>
        Chargement des documents...
      </SimplifiedAppContainer>
    );
  }

  if (error) {
    return (
      <SimplifiedAppContainer>
        Erreur lors du chargement des documents
      </SimplifiedAppContainer>
    );
  }

  return (
    <SimplifiedAppContainer>
      <Breadcrumb />

      <div className="grid grid-cols-4 gap-4">
        {documents &&
          documents.map((document) => (
            <Button
              onClick={() => selectDocument(document)}
              key={document.id}
              className="flex gap-2"
              variant={"neutral"}
            >
              <IconFileTypePdf />
              <p className="text-md font-normal">{document.name}</p>
            </Button>
          ))}
      </div>

      <BackButton />
    </SimplifiedAppContainer>
  );
}

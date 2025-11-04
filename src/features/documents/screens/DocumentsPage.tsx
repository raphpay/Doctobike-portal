import AppContainer from "@/shared/components/AppContainer";
import useDocumentsPage from "../hooks/useDocumentsPage";
import { Button } from "@/shared/components/ui/button";
import { IconFileTypePdf } from "@tabler/icons-react";

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
    return <AppContainer>Chargement des documents...</AppContainer>;
  }

  if (error) {
    return <AppContainer>Erreur lors du chargement des documents</AppContainer>;
  }

  return (
    <AppContainer>
      <div className="flex flex-col p-4 gap-4">
        <h1 className="text-start text-3xl font-bold">
          Documents techniques - {brand} - {model} - {year}
        </h1>

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
      </div>
    </AppContainer>
  );
}

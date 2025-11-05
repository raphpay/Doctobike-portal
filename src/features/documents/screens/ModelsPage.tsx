import useModelsPage from "../hooks/useModelsPage";
import { Button } from "@/shared/components/ui/button";
import SimplifiedAppContainer from "@/shared/components/SimplifiedAppContainer";
import Breadcrumb from "@/shared/components/Breadcrumb";

export default function ModelsPage() {
  const {
    data: models,
    totalPages,
    error,
    isLoading,
    page,
    selectModel,
    nextPage,
    previousPage,
  } = useModelsPage();

  if (isLoading) {
    return (
      <SimplifiedAppContainer>Chargement des modèles...</SimplifiedAppContainer>
    );
  }

  if (error) {
    return (
      <SimplifiedAppContainer>
        Erreur lors du chargement des modèles
      </SimplifiedAppContainer>
    );
  }

  return (
    <SimplifiedAppContainer>
      <Breadcrumb />

      <div className="flex flex-col p-4 gap-4">
        <div className="grid grid-cols-4 gap-4">
          {models &&
            models.map((model, index) => (
              <Button
                key={index}
                onClick={() => selectModel(model)}
                variant={"neutral"}
              >
                {model}
              </Button>
            ))}
        </div>

        <div className="flex w-full justify-center gap-4">
          <button
            className="cursor-pointer"
            onClick={previousPage}
            disabled={page === 1}
          >
            Précédent
          </button>
          <span>
            Page {page} sur {totalPages}
          </span>
          <button
            className="cursor-pointer"
            onClick={nextPage}
            disabled={page === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
    </SimplifiedAppContainer>
  );
}

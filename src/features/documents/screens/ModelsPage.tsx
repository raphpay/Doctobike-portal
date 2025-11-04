import AppContainer from "@/shared/components/AppContainer";
import useModelsPage from "../hooks/useModelsPage";
import { Button } from "@/shared/components/ui/button";

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
    return <AppContainer>Chargement des modèles...</AppContainer>;
  }

  if (error) {
    return <AppContainer>Erreur lors du chargement des modèles</AppContainer>;
  }

  return (
    <AppContainer>
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
    </AppContainer>
  );
}

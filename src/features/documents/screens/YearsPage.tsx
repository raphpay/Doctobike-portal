import AppContainer from "@/shared/components/AppContainer";
import useYearsPage from "../hooks/useYearsPage";
import { Button } from "@/shared/components/ui/button";

export default function YearsPage() {
  const {
    data: years,
    error,
    isLoading,
    selectYear,
    totalPages,
    nextPage,
    previousPage,
    page,
    brand,
    model,
  } = useYearsPage();

  if (isLoading) {
    return <AppContainer>Chargement des années...</AppContainer>;
  }

  if (error) {
    return <AppContainer>Erreur lors du chargement des années</AppContainer>;
  }

  return (
    <AppContainer>
      <div className="flex flex-col p-4 gap-4">
        <h1 className="text-start text-3xl font-bold">
          Documents techniques - {brand} - {model} - Années
        </h1>

        <div className="grid grid-cols-4 gap-4">
          {years &&
            years.map((year, index) => (
              <Button
                key={index}
                onClick={() => selectYear(year)}
                variant={"neutral"}
              >
                {year.year}
              </Button>
            ))}
        </div>

        {totalPages > 1 && (
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
        )}
      </div>
    </AppContainer>
  );
}

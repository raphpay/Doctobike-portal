import useYearsPage from "../hooks/useYearsPage";
import { Button } from "@/shared/components/ui/button";
import SimplifiedAppContainer from "@/shared/components/SimplifiedAppContainer";
import Breadcrumb from "@/shared/components/Breadcrumb";
import BackButton from "@/shared/components/ui/back-button";

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
  } = useYearsPage();

  if (isLoading) {
    return (
      <SimplifiedAppContainer>Chargement des années...</SimplifiedAppContainer>
    );
  }

  if (error) {
    return (
      <SimplifiedAppContainer>
        Erreur lors du chargement des années
      </SimplifiedAppContainer>
    );
  }

  return (
    <SimplifiedAppContainer>
      <Breadcrumb />

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

      <BackButton />
    </SimplifiedAppContainer>
  );
}

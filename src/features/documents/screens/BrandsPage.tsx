import AppContainer from "@/shared/components/AppContainer";
import { useBrandsQuery } from "../hooks/useBrandsQuery";
import { Button } from "@/shared/components/ui/button";
import useBrandsPage from "../hooks/useBrandsPage";

export default function BrandsPage() {
  const { data: brands, error, isLoading, selectBrand } = useBrandsPage();

  if (isLoading) return <AppContainer>Chargement des marques...</AppContainer>;

  if (error)
    return <AppContainer>Erreur lors du chargement des marques</AppContainer>;

  return (
    <AppContainer>
      <div className="flex flex-col h-full p-4 gap-4">
        <h1 className="text-start text-3xl font-bold">
          Documents techniques - Marques
        </h1>

        <div className="grid grid-cols-4 gap-4">
          {brands &&
            brands.map((brand, index) => (
              <Button
                key={index}
                onClick={() => selectBrand(brand)}
                variant={"neutral"}
                className="h-[50px] "
              >
                {brand.brand}
              </Button>
            ))}
        </div>
      </div>
    </AppContainer>
  );
}

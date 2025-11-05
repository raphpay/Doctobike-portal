import { Button } from "@/shared/components/ui/button";
import useBrandsPage from "../hooks/useBrandsPage";
import SimplifiedAppContainer from "@/shared/components/SimplifiedAppContainer";
import Breadcrumb from "@/shared/components/Breadcrumb";

export default function BrandsPage() {
  const { data: brands, error, isLoading, selectBrand } = useBrandsPage();

  if (isLoading)
    return (
      <SimplifiedAppContainer>Chargement des marques...</SimplifiedAppContainer>
    );

  if (error)
    return (
      <SimplifiedAppContainer>
        Erreur lors du chargement des marques
      </SimplifiedAppContainer>
    );

  return (
    <SimplifiedAppContainer>
      <Breadcrumb />

      <div className="flex flex-col h-full p-4 gap-4">
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
    </SimplifiedAppContainer>
  );
}

import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import type Brand from "../models/Brand";
import { useBrandsQuery } from "./useBrandsQuery";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";

export default function useBrandsPage() {
  const { data, error, isLoading } = useBrandsQuery();
  const { navigate } = useNavigationStack();

  function selectBrand(brand: Brand) {
    navigate(
      `${NavigationRoutes.TECHNICAL_DOCUMENTS}/${brand.brand}`,
      `${brand.brand}`,
    );
  }

  return { data, error, isLoading, selectBrand };
}

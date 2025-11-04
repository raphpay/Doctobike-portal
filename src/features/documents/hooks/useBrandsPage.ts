import { useBrandsQuery } from "./useBrandsQuery";

export default function useBrandsPage() {
  const { data, error, isLoading } = useBrandsQuery();

  return { data, error, isLoading };
}

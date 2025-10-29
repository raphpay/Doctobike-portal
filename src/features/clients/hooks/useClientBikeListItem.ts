import type { ClientBikeListItemProps } from "../components/ClientBikeListItem";
import { formatDate } from "@/shared/utils/dates";

export default function useClientBikeListItem({
  bike,
}: ClientBikeListItemProps) {
  const bikePurchaseDate = formatDate(bike.purchaseDate);

  function navigateToBikeDocs() {
    // Implement navigation logic here
  }

  function navigateToBikeRDV() {
    // Implement navigation logic here
  }

  return { bikePurchaseDate, navigateToBikeDocs, navigateToBikeRDV };
}

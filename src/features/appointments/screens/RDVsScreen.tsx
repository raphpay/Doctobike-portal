import { useShopQuery } from "@/features/shop/hooks/useShop";
import AppContainer from "@/shared/components/AppContainer";
import { useAppointmentsQuery } from "../hooks/useAppointmentsQuery";
import TopMainContainerBar from "@/shared/components/TopMainContainerBar";
import RDVListItem from "../components/RDVListItem";
import useRDVsScreen from "../hooks/useRDVsScreen";

export default function RDVsScreen() {
  const { createRDV } = useRDVsScreen();
  const {
    data: shop,
    isLoading: isShopLoading,
    error: shopError,
  } = useShopQuery();
  const {
    data: appointments,
    isLoading: isAppointmentsLoading,
    error: appointmentsError,
  } = useAppointmentsQuery(shop?.id ?? "");

  if (isAppointmentsLoading || isShopLoading) {
    return <AppContainer>Chargement des données...</AppContainer>;
  }

  if (shopError || appointmentsError) {
    return <AppContainer>Erreur lors du chargement des données</AppContainer>;
  }

  return (
    <AppContainer>
      <TopMainContainerBar
        title="Rendez-Vous"
        buttonTitle="Créer un RDV"
        action={createRDV}
      />
      <div className="flex flex-col gap-4">
        {appointments?.map((appointment, index) => (
          <div
            key={appointment.id}
            className="grid grid-cols-4 items-center gap-4"
          >
            <RDVListItem key={index} rdv={appointment} />
          </div>
        ))}
      </div>
    </AppContainer>
  );
}

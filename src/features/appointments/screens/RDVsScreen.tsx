import { useShopQuery } from "@/features/shop/hooks/useShop";
import AppContainer from "@/shared/components/AppContainer";
import { useAppointmentsQuery } from "../hooks/useAppointmentsQuery";
import TopMainContainerBar from "@/shared/components/TopMainContainerBar";
import Card from "@/shared/components/Card";

export default function RDVsScreen() {
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
        action={() => console.log("Create appointment")}
      />
      <div className="flex flex-col gap-4">
        {appointments?.map((appointment) => (
          <div key={appointment.id} className="flex items-center gap-4">
            <Card>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{appointment.id}</p>
                <p className="text-sm text-gray-500">{appointment.shopID}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </AppContainer>
  );
}

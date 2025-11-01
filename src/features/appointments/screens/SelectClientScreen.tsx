import AppContainer from "@/shared/components/AppContainer";
import BackButton from "@/shared/components/BackButton";
import TopMainContainerBar from "@/shared/components/TopMainContainerBar";
import useSelectClientScreen from "../hooks/useSelectClientScreen";
import SelectClientListItem from "../components/SelectClientListItem";

export default function SelectClientScreen() {
  const { data, error, isLoading } = useSelectClientScreen();

  if (isLoading) {
    return <AppContainer>Chargement des clients...</AppContainer>;
  }

  if (error) {
    return <AppContainer>Erreur lors du chargement des clients</AppContainer>;
  }

  return (
    <AppContainer>
      <div className="flex flex-col justify-between h-full p-4">
        <div className="flex flex-col gap-4">
          <TopMainContainerBar title="Selectionner un client pour le RDV" />

          <div className="grid grid-cols-4 gap-8">
            {data &&
              data.length > 0 &&
              data.map((client, index) => (
                <SelectClientListItem key={index} client={client} />
              ))}

            {!data || (data.length === 0 && <p>Aucun client trouvé</p>)}
          </div>
        </div>

        <div className="flex w-full justify-end">
          <BackButton />
        </div>
      </div>
    </AppContainer>
  );
}

import { useSelector } from "react-redux";

import EmAndamento from "./EmAndamento";
import Historico from "./Historico";
import NovoProcesso from "./NovoProcesso";

const MainContentAdvogado = () => {
  const selectedContent = useSelector((state) => state.selectedContent.value);
  if (selectedContent === "Histórico") return <Historico />;
  else if (selectedContent === "Novo processo") return <NovoProcesso />;
  return <EmAndamento />;
};

export default MainContentAdvogado;

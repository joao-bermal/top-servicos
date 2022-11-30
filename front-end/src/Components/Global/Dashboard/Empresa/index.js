import { useSelector } from "react-redux";

import EmAndamento from "./EmAndamento";
import Historico from "./Historico";
import Advogados from "./Advogados";

const MainContentEmpresa = () => {
  const selectedContent = useSelector((state) => state.selectedContent.value);
  if (selectedContent === "Histórico") return <Historico />;
  else if (selectedContent === "Advogados") return <Advogados />;
  else return <EmAndamento />;
};

export default MainContentEmpresa;

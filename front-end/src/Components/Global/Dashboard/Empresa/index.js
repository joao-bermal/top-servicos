import { useSelector } from "react-redux";

import EmAndamento from "./EmAndamento";
import Historico from "./Historico";

const MainContentEmpresa = () => {
  const selectedContent = useSelector((state) => state.selectedContent.value);
  if (selectedContent == "Histórico") return <Historico />;
  return <EmAndamento />;
};

export default MainContentEmpresa;

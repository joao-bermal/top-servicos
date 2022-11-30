import { useSelector } from "react-redux";

import Empresas from "./Empresas";
import Advogados from "./Advogados";
import Processos from "./Processos";

const MainContentSecretaria = () => {
  const selectedContent = useSelector((state) => state.selectedContent.value);
  if (selectedContent === "advogados") return <Advogados />;
  else if (selectedContent === "processos") return <Processos />;
  return <Empresas />;
};

export default MainContentSecretaria;

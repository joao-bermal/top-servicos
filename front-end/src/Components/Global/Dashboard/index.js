import getUserType from "../../../Utils/getUserType";
import MainContentAdvogado from "./Advogado";
import MainContentEmpresa from "./Empresa";
import MainContentSecretaria from "./Secretaria";

const MainContent = () => {
  if (getUserType() == "Funcionário")
    JSON.parse(localStorage.getItem("user")).cargo == "Advogado" ? (
      <MainContentAdvogado />
    ) : (
      <MainContentSecretaria />
    );
  else return <MainContentEmpresa />;
};

export default MainContent;

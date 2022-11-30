import getUserType from "../../../../Utils/getUserType";
import MobileListAdvogado from "./Advogado";
import MobileListEmpresa from "./Empresa";
import MobileListSecretaria from "./Secretaria";

const MobileList = () => {
  if (getUserType() === "Funcionário")
    return JSON.parse(localStorage.getItem("user")).cargo === "Advogado" ? (
      <MobileListAdvogado />
    ) : (
      <MobileListSecretaria />
    );
  else return <MobileListEmpresa />;
};
export default MobileList;

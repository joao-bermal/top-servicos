import ChangeProfileDataFuncionario from "./Funcionario";
import ChangeProfileDataEmpresa from "./Empresa";
import getUserType from "../../../../../Utils/getUserType";

const ChangeProfileData = () => {
  if (getUserType() == "Funcionário") return <ChangeProfileDataFuncionario />;
  else return <ChangeProfileDataEmpresa />;
};

export default ChangeProfileData;

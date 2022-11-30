import AdvogadoItems from "./Advogado";
import EmpresaItems from "./Empresa";
import SecretariaItems from "./Secretaria";
import getUserType from "../../../../Utils/getUserType";

const Items = () => {
  if (getUserType() === "Funcionário") {
    return JSON.parse(localStorage.getItem("user")).cargo === "Advogado" ? (
      <AdvogadoItems />
    ) : (
      <SecretariaItems />
    );
  } else return <EmpresaItems />;
};
export default Items;

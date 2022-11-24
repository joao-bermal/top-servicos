import AdvogadoItems from "./Advogado";

const Items = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.cargo == "Advogado") return <AdvogadoItems />;
};
export default Items;

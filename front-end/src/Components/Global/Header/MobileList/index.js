import MobileListAdvogado from "./Advogado";

const MobileList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.cargo == "Advogado") return <MobileListAdvogado />;
};
export default MobileList;

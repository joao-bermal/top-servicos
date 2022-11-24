import ChangeProfileDataAdvogado from "./Advogado";

const ChangeProfileData = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.cargo == "Advogado") return <ChangeProfileDataAdvogado />;
  // else if (user.cargo == "Secretária") return <DashboardSecretaria />;
  // return <DashboardEmpresa />;
};

export default ChangeProfileData;

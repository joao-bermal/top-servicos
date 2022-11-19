import DashboardEmpresa from "./DashboardEmpresa";
import DashboardAdvogado from "./DashboardAdvogado";
import DashboardSecretaria from "./DashboardSecretaria";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.cargo == "Advogado") return <DashboardAdvogado />;
  else if (user.cargo == "Secretária") return <DashboardSecretaria />;
  return <DashboardEmpresa />;
}

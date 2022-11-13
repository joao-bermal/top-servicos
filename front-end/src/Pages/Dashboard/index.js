import DashboardEmpresa from "./DashboardEmpresa";
import DashboardFuncionario from "./DashboardFuncionario";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  // if (user.cnpj) return <DashboardEmpresa />;
  // if (user.cpf) return <DashboardFuncionario />;
  return <DashboardEmpresa />;
}

import axios from "axios";

const updateStorage = () => {
  const api = axios.create({
    baseURL: "http://localhost:8000",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  let userType = "";
  user.cargo == "Advogado" || user.cargo == "Secretária"
    ? (userType = "Funcionário")
    : (userType = "Empresa");
  if (userType == "Empresa")
    api.get(`/empresa/${user.id}`).then((response) => {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.data));
    });
  else
    api.get(`/funcionario/${user.id}`).then((response) => {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.data));
    });
};

export default updateStorage;

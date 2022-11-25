const getUserType = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let userType = "";
  user.cargo == "Advogado" || user.cargo == "Secretária"
    ? (userType = "Funcionário")
    : (userType = "Empresa");

  return userType;
};

export default getUserType;

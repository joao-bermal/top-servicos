import { useDispatch } from "react-redux";
import { onChangeContent } from "../../../../features/selectedContent";
import { ListItemButton, ListItemText } from "@mui/material";
import {
  Business,
  Contacts,
  Dashboard,
  AccountCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MobileListSecretaria = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard");
          dispatch(onChangeContent("empresas"));
        }}
      >
        <Business fontSize="small" />
        <ListItemText sx={{ marginLeft: 1 }} primary="Empresas" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard");
          dispatch(onChangeContent("advogados"));
        }}
      >
        <Contacts fontSize="small" />
        <ListItemText sx={{ marginLeft: 1 }} primary="Advogados" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard");
          dispatch(onChangeContent("processos"));
        }}
      >
        <Dashboard fontSize="small" />
        <ListItemText sx={{ marginLeft: 1 }} primary="Processos" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/account");
        }}
      >
        <AccountCircle fontSize="small" />
        <ListItemText sx={{ marginLeft: 1 }} primary="Minha Conta" />
      </ListItemButton>
    </div>
  );
};

export default MobileListSecretaria;

import { useDispatch } from "react-redux";
import { onChangeContent } from "../../../../features/selectedContent";
import { ListItemButton, ListItemText } from "@mui/material";
import {
  Dashboard,
  ManageSearch,
  Contacts,
  AccountCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MobileListEmpresa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard");
          dispatch(onChangeContent("Em andamento"));
        }}
      >
        <Dashboard fontSize="small" />
        <ListItemText sx={{ marginLeft: 1 }} primary="Processos em andamento" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard");
          dispatch(onChangeContent("Histórico"));
        }}
      >
        <ManageSearch fontSize="small" />
        <ListItemText sx={{ marginLeft: 1 }} primary="Histórico de processos" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard");
          dispatch(onChangeContent("Advogados"));
        }}
      >
        <Contacts fontSize="small" />
        <ListItemText sx={{ marginLeft: 1 }} primary="Advogados" />
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

export default MobileListEmpresa;

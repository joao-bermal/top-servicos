import { useDispatch } from "react-redux";
import { ListItemButton, ListItemText } from "@mui/material";
import { Dashboard, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DesktopList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <Dashboard fontSize="small" />
        <ListItemText sx={{ marginLeft: 1 }} primary="Dashboard" />
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

export default DesktopList;

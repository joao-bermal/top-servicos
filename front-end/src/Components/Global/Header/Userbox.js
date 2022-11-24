import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import MobileList from "./MobileList";
import DesktopList from "./DesktopList";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import isMobile from "../../../Utils/isMobile";

function HeaderUserbox() {
  const data = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const UserAvatar = (props) => {
    return (
      <Avatar variant="rounded" alt={data.nome}>
        {data.nome.substring(0, 1)}
      </Avatar>
    );
  };

  const OutsideSummary = (props) => {
    return (
      <Box sx={{ textAlign: "left", paddingLeft: "8px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            display: "block",
            textTransform: "none",
          }}
          variant="body1"
        >
          {data.nome}
        </Typography>
        <Typography
          sx={{
            fontWeight: "light",
            color: "#ffffff",
            textTransform: "none",
          }}
          variant="body2"
        >
          Cargo: {data.cargo}
        </Typography>
      </Box>
    );
  };

  const InsideSummary = (props) => {
    return (
      <Box sx={{ textAlign: "left", paddingLeft: "8px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#000000",
            display: "block",
            textTransform: "none",
          }}
          variant="body1"
        >
          {data.nome}
        </Typography>
        <Typography
          sx={{
            fontWeight: "light",
            color: "#000000",
            textTransform: "none",
          }}
          variant="body2"
        >
          Cargo: {data.cargo}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Button
        sx={{ maginLeft: "8px", marginRight: "8px" }}
        onClick={handleOpen}
      >
        <UserAvatar />
        <Hidden mdDown>
          <OutsideSummary />
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1, color: "#ffffff" }} />
        </Hidden>
      </Button>
      <Popover
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ padding: "8px", minWidth: 210 }} display="flex">
          <UserAvatar />
          <InsideSummary />
        </Box>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          {isMobile() ? <MobileList /> : <DesktopList />}
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={logout}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sair
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;

import { styled } from "@mui/material/styles";

import { Divider, List, Toolbar, IconButton } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

import Items from "./Items";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(0),
      },
    }),
  },
}));

const Sidebar = ({ open }) => {
  return (
    <Drawer variant="permanent" open={open} sx={{ mt: 13 }}>
      <List component="nav" sx={{ mt: 3 }}>
        <Items />
        <Divider sx={{ my: 2 }} />
      </List>
    </Drawer>
  );
};

export default Sidebar;

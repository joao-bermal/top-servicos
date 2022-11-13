import { styled } from "@mui/material/styles";

import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";

import HeaderUserbox from "./Userbox";

import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: "100%",
  backgroundColor: "#000000",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
}));
const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   backgroundColor: "#000000",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     display: "flex",
//     // justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));
const Header = ({ toggleDrawer }) => {
  return (
    <AppBar position="fixed">
      <Button
        onClick={toggleDrawer}
        sx={{
          ml: 4,
          color: "#5d5d5d",
          "&:hover": {
            backgroundColor: "#070d0d",
          },
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: "#000000",
            width: 144,
            height: "90%",
            borderRadius: "0",
          }}
        >
          <img src="white-logo-wbg.png" style={{ width: "65%" }} />
        </Avatar>
      </Button>
      <HeaderUserbox />
    </AppBar>
  );
};

export default Header;

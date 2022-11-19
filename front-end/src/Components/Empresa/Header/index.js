import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";

import HeaderUserbox from "./Userbox";

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

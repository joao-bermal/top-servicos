import { styled } from "@mui/material/styles";
import { Box, Button, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

import HeaderUserbox from "./Userbox";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: "100%",
  backgroundColor: "#000000",
}));

const drawerWidth = 240;

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ my: 1 }}>
          <img
            src={process.env.PUBLIC_URL + "/horizontal_logo.png"}
            style={{ width: "70%", height: "88%" }}
          />
        </Box>
        <Button
          sx={{
            ml: "auto",
            color: "#5d5d5d",
          }}
        ></Button>
        <HeaderUserbox />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

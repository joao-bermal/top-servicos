import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
} from "@mui/material";

import Header from "../../Components/Global/Header";
import ChangeProfileData from "../../Components/Global/Account/Content/ChangeProfileData";
import Copyright from "../../Components/Global/Copyright";

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          maxWidth: "none",
        }}
      >
        <Toolbar />
        <Container
          maxWidth={false}
          sx={{ mt: 10, mb: 4, height: "78%", width: "60%" }}
        >
          <Grid container spacing={3} sx={{ height: "100%" }}>
            <Grid item xs={12} sx={{ height: "100%" }}>
              <Paper
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <ChangeProfileData />
              </Paper>
            </Grid>
          </Grid>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export default function DashboardAdvogado() {
  return <DashboardContent />;
}

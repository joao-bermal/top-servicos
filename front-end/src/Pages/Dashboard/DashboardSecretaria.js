import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
} from "@mui/material";

import Header from "../../Components/Advogado/Header";
import Sidebar from "../../Components/Advogado/Sidebar";
import MainContent from "../../Components/Advogado/Dashboard/MainContent";
import Copyright from "../../Components/Copyright";

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar open={open} />
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
          sx={{ mt: 10, mb: 4, height: "78%", width: "90%" }}
        >
          <Grid container spacing={3} sx={{ height: "100%" }}>
            <Grid item xs={12} sx={{ height: "100%" }}>
              <Paper
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <MainContent />
              </Paper>
            </Grid>
          </Grid>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export default function DashboardSecretaria() {
  return <DashboardContent />;
}

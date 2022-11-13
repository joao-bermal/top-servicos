import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";
import LoginRoute from "./Routes/Login";
import CadastroEmpresaRoute from "./Routes/CadastroEmpresa";
import CadastroFuncionarioRoute from "./Routes/CadastroFuncionario";
import DashboardRoute from "./Routes/Dashboard";
import LoginAuth from "./Pages/Login/LoginAuth";
import RequireAuth from "./Pages/Login/RequireAuth";

const mdTheme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="login"
            element={
              <LoginAuth>
                <LoginRoute />
              </LoginAuth>
            }
          />
          <Route path="cadastro-empresa" element={<CadastroEmpresaRoute />} />
          <Route
            path="cadastro-funcionario"
            element={<CadastroFuncionarioRoute />}
          />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <DashboardRoute />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

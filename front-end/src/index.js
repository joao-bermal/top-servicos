import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import selectedContentReducer from "./features/selectedContent";
import selectedRowsReducer from "./features/selectedRows";
import handleUpdateReducer from "./features/handleUpdate";

import App from "./App";
import LoginRoute from "./Routes/Login";
import CadastroEmpresaRoute from "./Routes/CadastroEmpresa";
import CadastroFuncionarioRoute from "./Routes/CadastroFuncionario";
import DashboardRoute from "./Routes/Dashboard";
import LoginAuth from "./Pages/Login/LoginAuth";
import RequireAuth from "./Pages/Login/RequireAuth";

const store = configureStore({
  reducer: {
    selectedContent: selectedContentReducer,
    selectedRows: selectedRowsReducer,
    handleUpdate: handleUpdateReducer,
  },
});

const mdTheme = createTheme();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <ThemeProvider theme={mdTheme}>
      <Provider store={store}>
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
      </Provider>
    </ThemeProvider>
  </>
);

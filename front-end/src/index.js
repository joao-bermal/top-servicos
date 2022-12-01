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
import AccountRoute from "./Routes/Account";
import PasswordRoute from "./Routes/Password";
import LoginAuth from "./Pages/Login/LoginAuth";
import RequireAuth from "./Pages/Login/RequireAuth";
import ForgotPasswordRoute from "./Routes/ForgotPassword";
import ChangePasswordRoute from "./Routes/ChangePassword";

const store = configureStore({
  reducer: {
    selectedContent: selectedContentReducer,
    selectedRows: selectedRowsReducer,
    handleUpdate: handleUpdateReducer,
  },
});

// const mdTheme = createTheme();

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
  },
});
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
            <Route
              path="account"
              element={
                <RequireAuth>
                  <AccountRoute />
                </RequireAuth>
              }
            />
            <Route
              path="account/password"
              element={
                <RequireAuth>
                  <PasswordRoute />
                </RequireAuth>
              }
            />
            <Route path="resetpassword" element={<ForgotPasswordRoute />} />
            <Route path="changepassword" element={<ChangePasswordRoute />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </>
);

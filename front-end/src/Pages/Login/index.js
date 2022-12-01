import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Snackbar,
  Alert,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import Copyright from "../../Components/Global/Copyright";
import useWindowSize from "../../Utils/useWindowSize";
import { cpfCnpjMask } from "../../Utils/masks";

import axios from "axios";

export default function SignInSide() {
  const [open, setOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [styleProps, setStyleProps] = useState({
    marginXRightPanel: 8,
    display: "flex",
  });

  const [formValues, setFormValues] = useState({
    cpf_cnpj: "",
    senha: "",
  });

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_DEV_ADDRESS,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFormChange = (value, identifier) => {
    let newForm = { ...formValues };
    newForm[identifier] = value;
    setFormValues(newForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.cpf_cnpj == "" || formValues.senha == "")
      return setOpen(true);

    let reqData = {
      credentials: { senha: formValues.senha },
    };

    if (formValues.cpf_cnpj.length == 14)
      reqData = {
        type: "funcionario",
        credentials: {
          cpf: formValues.cpf_cnpj,
          ...reqData.credentials,
        },
      };
    else if (formValues.cpf_cnpj.length == 18)
      reqData = {
        type: "empresa",
        credentials: {
          cnpj: formValues.cpf_cnpj,
          ...reqData.credentials,
        },
      };

    api
      .post(`/login-${reqData.type}`, reqData.credentials)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return navigate("/dashboard");
      })
      .catch((error) => {
        return setOpen(true);
      });
  };

  const size = useWindowSize();

  useEffect(() => {
    if (size.width < size.height) {
      setIsMobile(true);
      setStyleProps({ marginXRightPanel: 2, display: "flex" });
    } else {
      setIsMobile(false);
      if (size.width < 900)
        setStyleProps({ marginXRightPanel: 8, display: "none" });
      else setStyleProps({ marginXRightPanel: 8, display: "flex" });
    }
  }, [size]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      {isMobile == false && (
        <Grid item xs={false} sm={4} md={6}>
          <div
            style={{
              position: "fixed",
              width: "50%",
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#000000",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: styleProps.display,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="logo.png"
              style={{ width: "35%", height: "28%", alignSelf: "center" }}
            />
          </div>
        </Grid>
      )}

      <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: "20%",
            width: "100%",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "#ffffff", width: "20%", height: "15%" }}
          >
            <img src="white-logo.png" style={{ width: "65%" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bem-vindo de volta!
            <br />
          </Typography>
          <Typography component="h2">
            Faça login na sua conta Top Serviços
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "90%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="cpf-cnpj"
              label="CPF/CNPJ"
              name="cpf-cnpj"
              autoComplete="cpf-cnpj"
              autoFocus
              value={formValues.cpf_cnpj}
              onChange={(event) => {
                handleFormChange(cpfCnpjMask(event.target.value), "cpf_cnpj");
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formValues.senha}
              onChange={(event) => {
                handleFormChange(event.target.value, "senha");
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#000000" }}
            >
              Entrar
            </Button>
            <Link
              component="button"
              variant="body2"
              sx={{ mt: 1, color: "#0000EE" }}
              onClick={() => navigate("/resetpassword")}
            >
              Esqueceu a senha?
            </Link>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link
                component="button"
                variant="body2"
                sx={{ mr: "auto", color: "#0000EE" }}
                onClick={() => navigate("/cadastro-empresa")}
              >
                Cadastre-se como empresa aqui
              </Link>
              <Link
                component="button"
                variant="body2"
                sx={{ ml: "auto", color: "#0000EE" }}
                onClick={() => navigate("/cadastro-funcionario")}
              >
                Cadastre-se como funcionário aqui
              </Link>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                variant="filled"
                severity="error"
                sx={{ width: "100%" }}
              >
                Falha ao realizar o login
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

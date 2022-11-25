import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { cnpjMask, telefoneMask } from "../Utils/masks";
import useWindowSize from "../Utils/useWindowSize";
import Copyright from "../Components/Global/Copyright";

import axios from "axios";
import { cnpj } from "cpf-cnpj-validator";

const theme = createTheme();

export default function SignInSide() {
  const [isMobile, setIsMobile] = useState(false);
  const [styleProps, setStyleProps] = useState({
    marginXRightPanel: 8,
    display: "flex",
  });

  const [formValues, setFormValues] = useState({
    cnpj: "",
    razao_social: "",
    telefone: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  const size = useWindowSize();

  const handleFormChange = (value, identifier) => {
    let newForm = { ...formValues };
    newForm[identifier] = value;
    setFormValues(newForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      cnpj.isValid(formValues.cnpj) &&
      formValues.razao_social != "" &&
      formValues.telefone != "" &&
      formValues.email != "" &&
      formValues.senha != "" &&
      formValues.confirmaSenha != "" &&
      formValues.senha == formValues.confirmaSenha
    )
      api
        .post("/add-empresa", formValues)
        .then((response) => {
          localStorage.setItem("user", response.data);
          window.location.href = "/dashboard";
          return;
        })
        .catch((error) => {
          setErrorMessage("Falha na requisição.");
        });
    else setErrorMessage("Dados Inválidos. Tente novamente!");
  };

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
    <ThemeProvider theme={theme}>
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

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 11,
              mx: styleProps.marginXRightPanel,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "#ffffff", width: "20%", height: "15%" }}
            >
              <img src="white-logo.png" style={{ width: "65%" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Bem-vindo!
              <br />
            </Typography>
            <Typography component="h1">
              Cadastre sua empresa na Top Serviços
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="cnpj"
                label="CNPJ"
                name="cnpj"
                autoComplete="cnpj"
                autoFocus
                value={formValues.cnpj}
                onChange={(event) => {
                  handleFormChange(cnpjMask(event.target.value), "cnpj");
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Razão Social"
                name="name"
                autoComplete="name"
                value={formValues.razao_social}
                onChange={(event) => {
                  handleFormChange(event.target.value, "razao_social");
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Telefone"
                name="phone"
                autoComplete="phone"
                value={formValues.telefone}
                onChange={(event) => {
                  handleFormChange(
                    telefoneMask(event.target.value),
                    "telefone"
                  );
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de email"
                name="email"
                autoComplete="email"
                value={formValues.email}
                onChange={(event) => {
                  handleFormChange(event.target.value, "email");
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirme a senha"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={formValues.confirmaSenha}
                onChange={(event) => {
                  handleFormChange(event.target.value, "confirmaSenha");
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#000000" }}
              >
                Cadastrar
              </Button>
              {/* add hover color as white */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

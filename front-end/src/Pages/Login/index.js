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

import useWindowSize from "../../Utils/useWindowSize";
import { cpfCnpjMask } from "../../Utils/masks";
import Copyright from "../../Components/Global/Copyright";

import axios from "axios";

const theme = createTheme();

export default function SignInSide() {
  const [isMobile, setIsMobile] = useState(false);
  const [styleProps, setStyleProps] = useState({
    marginXRightPanel: 8,
    display: "flex",
  });

  const [formValues, setFormValues] = useState({
    cpf_cnpj: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  const handleFormChange = (value, identifier) => {
    let newForm = { ...formValues };
    newForm[identifier] = value;
    setFormValues(newForm);
  };

  // 18 = cnpj, 14 = cpf
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.cpf_cnpj == "" || formValues.senha == "")
      return setErrorMessage("Dados Inválidos. Tente novamente!");

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
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/dashboard";
        return;
      })
      .catch((error) => {
        setErrorMessage("Falha na requisição.");
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
              mx: styleProps.marginXRightPanel,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: "20%",
              // justifyContent: "center",
              // height: "100%",
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
              sx={{ mt: 1 }}
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
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembre-se de mim"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#000000" }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="/cadastro-empresa" variant="body2">
                    {"Não tem uma conta? Cadastre sua empresa"}
                  </Link>
                  <br />
                  <Link href="/cadastro-funcionario" variant="body2">
                    {"Não tem uma conta? Cadastre seu funcionário"}
                  </Link>
                </Grid> */}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

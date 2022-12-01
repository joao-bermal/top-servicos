import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Snackbar,
  Alert,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import Copyright from "../../Components/Global/Copyright";
import { cpfCnpjMask } from "../../Utils/masks";

import axios from "axios";

const ForgotPassword = () => {
  const [open, setOpen] = useState({ success: false, error: false });
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    cpf_cnpj: "",
  });

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_DEV_ADDRESS,
  });

  const setOpenValue = (identifier, value) => {
    let newValue = { ...open };
    newValue[identifier] = value;
    setOpen(newValue);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenValue("success", false);
    navigate("/changepassword");
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenValue("error", false);
  };

  const handleFormChange = (value, identifier) => {
    let newForm = { ...formValues };
    newForm[identifier] = value;
    setFormValues(newForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (formValues.cpf_cnpj == "") {
      setIsLoading(false);
      return setOpenValue("error", true);
    }

    let user_type = "";
    formValues.cpf_cnpj.length == 14
      ? (user_type = "Funcionário")
      : (user_type = "Empresa");

    const reqData = {
      user_type: user_type,
      cpf_cnpj: formValues.cpf_cnpj,
    };
    api
      .post(`/auth/forgot-password`, reqData)
      .then((response) => {
        setIsLoading(false);
        return setOpenValue("success", true);
      })
      .catch((error) => {
        setIsLoading(false);
        return setOpenValue("error", true);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ width: "60%" }}
          >
            <Button
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              sx={{ mb: 5 }}
              color="inherit"
              onClick={() => navigate("/login")}
            >
              Voltar
            </Button>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "#ffffff", width: "14%", height: "15%" }}
              >
                <img src="white-logo.png" style={{ width: "65%" }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Bem-vindo de volta!
                <br />
              </Typography>
              <Typography component="h2">
                Recupere sua conta Topservicos
              </Typography>
            </Box>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#000000" }}
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Enviar email"
              )}
            </Button>
            <Copyright sx={{ mt: 5 }} />
            <Snackbar
              open={open.success}
              autoHideDuration={1500}
              onClose={handleCloseSuccess}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseSuccess}
                variant="filled"
                severity="success"
                sx={{ width: "100%" }}
              >
                Email enviado!
              </Alert>
            </Snackbar>
            <Snackbar
              open={open.error}
              autoHideDuration={3000}
              onClose={handleCloseError}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseError}
                variant="filled"
                severity="error"
                sx={{ width: "100%" }}
              >
                Não foi possível enviar o email.
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;

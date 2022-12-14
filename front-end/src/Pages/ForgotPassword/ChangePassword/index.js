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
} from "@mui/material";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import Copyright from "../../../Components/Global/Copyright";

import axios from "axios";

const ChangePassword = () => {
  const [open, setOpen] = useState({ success: false, error: false });

  const [formValues, setFormValues] = useState({
    resetCode: "",
    newPassword: "",
    confirmNewPassword: "",
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
    navigate("/login");
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
    if (
      formValues.resetCode != "" &&
      formValues.newPassword != "" &&
      formValues.confirmNewPassword != "" &&
      formValues.newPassword === formValues.confirmNewPassword
    ) {
      const reqData = {
        reset_code: formValues.resetCode,
        new_password: formValues.newPassword,
      };
      api
        .post(`/auth/reset-password`, reqData)
        .then((response) => {
          return setOpenValue("success", true);
        })
        .catch((error) => {
          return setOpenValue("error", true);
        });
    } else return setOpenValue("error", true);
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
            sx={{ mt: 1, width: "60%" }}
          >
            <Button
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              sx={{ mb: 5 }}
              color="inherit"
              onClick={() => navigate("/resetpassword")}
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
              id="resetCode"
              label="C??digo enviado"
              name="resetCode"
              autoComplete="resetCode"
              autoFocus
              value={formValues.resetCode}
              onChange={(event) => {
                handleFormChange(event.target.value, "resetCode");
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="Nova senha"
              name="newPassword"
              autoComplete="newPassword"
              type="password"
              autoFocus
              value={formValues.newPassword}
              onChange={(event) => {
                handleFormChange(event.target.value, "newPassword");
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmNewPassword"
              label="Confirmar nova senha"
              name="confirmNewPassword"
              autoComplete="confirmNewPassword"
              type="password"
              autoFocus
              value={formValues.confirmNewPassword}
              onChange={(event) => {
                handleFormChange(event.target.value, "confirmNewPassword");
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#000000" }}
            >
              Alterar senha
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
                Senha alterada com sucesso!
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
                N??o foi poss??vel alterar a senha.
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;

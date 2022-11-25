import { useEffect, useState, useCallback } from "react";

import {
  Box,
  Button,
  Avatar,
  TextField,
  Autocomplete,
  Snackbar,
  Alert,
  Typography,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Edit } from "@mui/icons-material/";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import updateStorage from "../../../../Utils/updateStorage";

import Title from "../../../Global/Title";

export default function ChangePassword() {
  const [formValues, setFormValues] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    navigate("/dashboard");
  };

  const handleFormChange = (value, identifier) => {
    let newForm = { ...formValues };
    newForm[identifier] = value;
    setFormValues(newForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    let userType = "";
    user.cargo == "Advogado" || user.cargo == "Secretária"
      ? (userType = "Funcionário")
      : (userType = "Empresa");
    if (
      formValues.senhaAtual != "" &&
      formValues.novaSenha != "" &&
      formValues.confirmarNovaSenha != "" &&
      formValues.novaSenha == formValues.confirmarNovaSenha &&
      formValues.senhaAtual == user.senha
    ) {
      const reqValues = {
        id: user.id,
        new_password: formValues.novaSenha,
        user_type: userType,
      };
      api
        .post("/auth/update-password", reqValues)
        .then((response) => {
          updateStorage();
          return setOpen(true);
        })
        .catch((error) => {
          setErrorMessage("Falha na requisição.");
        });
    } else setErrorMessage("Dados Inválidos. Tente novamente!");
  };

  return (
    <>
      <Title>Alterar senha</Title>

      <Box
        sx={{
          mt: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
          }}
        >
          <TextField
            margin="normal"
            required
            sx={{ width: "90%" }}
            name="currentPassword"
            label="Senha atual"
            type="password"
            id="currentPassword"
            autoComplete="current-password"
            value={formValues.senha}
            onChange={(event) => {
              handleFormChange(event.target.value, "senhaAtual");
            }}
          />
          <TextField
            margin="normal"
            required
            sx={{ width: "90%" }}
            name="newPassword"
            label="Nova senha"
            type="newPassword"
            id="newPassword"
            autoComplete="current-password"
            value={formValues.senha}
            onChange={(event) => {
              handleFormChange(event.target.value, "novaSenha");
            }}
          />
          <TextField
            margin="normal"
            required
            sx={{ width: "90%" }}
            name="confirmPassword"
            label="Confirme a senha"
            type="password"
            id="confirmPassword"
            value={formValues.senha}
            onChange={(event) => {
              handleFormChange(event.target.value, "confirmarNovaSenha");
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 5, backgroundColor: "#000000", width: "90%" }}
          >
            Enviar senha
          </Button>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              variant="filled"
              severity="success"
              sx={{ width: "100%" }}
            >
              Senha alterada com sucesso!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
}

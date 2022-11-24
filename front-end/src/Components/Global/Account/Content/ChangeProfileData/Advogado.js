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
import axios from "axios";

import Title from "../../../../Global/Title";
import { telefoneMask } from "../../../../../Utils/masks";
import { useNavigate } from "react-router-dom";

export default function ChangeProfileDataAdvogado() {
  const [formValues, setFormValues] = useState({
    id: JSON.parse(localStorage.getItem("user")).id,
    cpf: JSON.parse(localStorage.getItem("user")).cpf,
    cargo: JSON.parse(localStorage.getItem("user")).cargo,
    nome: JSON.parse(localStorage.getItem("user")).nome,
    email: JSON.parse(localStorage.getItem("user")).email,
    telefone: JSON.parse(localStorage.getItem("user")).telefone,
  });
  const [disabled, setDisabled] = useState({
    cpf: true,
    nome: true,
    cargo: true,
    email: true,
    telefone: true,
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
  };

  const handleFormChange = (value, identifier) => {
    let newForm = { ...formValues };
    newForm[identifier] = value;
    setFormValues(newForm);
  };

  const handleEnable = (identifier) => {
    let newForm = { ...disabled };
    newForm[identifier] = !disabled[identifier];
    setDisabled(newForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formValues.nome != "" &&
      formValues.email != "" &&
      formValues.telefone != ""
    )
      api
        .post("/update-funcionario", formValues)
        .then((response) => {
          return setOpen(true);
        })
        .catch((error) => {
          setErrorMessage("Falha na requisição.");
        });
    else setErrorMessage("Dados Inválidos. Tente novamente!");
  };

  return (
    <>
      <Title>Meu perfil</Title>

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
            disabled={disabled.cpf}
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="cpf"
            label="CPF"
            name="cpf"
            autoComplete="cpf"
            value={formValues.cpf}
            onChange={(event) => {
              handleFormChange(event.target.value, "cpf");
            }}
          />
          <TextField
            disabled={disabled.cargo}
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="cargo"
            label="Cargo"
            name="cargo"
            autoComplete="cargo"
            value={formValues.cargo}
            onChange={(event) => {
              handleFormChange(event.target.value, "cargo");
            }}
          />
          <TextField
            color="primary"
            disabled={disabled.nome}
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
            value={formValues.nome}
            onChange={(event) => {
              handleFormChange(event.target.value, "nome");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => handleEnable("nome")}
                  >
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            color="primary"
            disabled={disabled.email}
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formValues.email}
            onChange={(event) => {
              handleFormChange(event.target.value, "email");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => handleEnable("email")}
                  >
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            color="primary"
            disabled={disabled.telefone}
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="telefone"
            label="Telefone"
            name="telefone"
            autoComplete="telefone"
            autoFocus
            value={formValues.telefone}
            onChange={(event) => {
              handleFormChange(telefoneMask(event.target.value), "telefone");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => handleEnable("telefone")}
                  >
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 5, backgroundColor: "#000000", width: "90%" }}
          >
            Atualizar dados
          </Button>
          {/* add hover color as white */}
          <Link
            component="button"
            variant="body2"
            sx={{ mt: 3, color: "#0000EE" }}
            onClick={() => {
              navigate("/account/password");
            }}
          >
            Clique aqui para alterar a sua senha
          </Link>
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
              Dados alterados com sucesso!
            </Alert>
          </Snackbar>
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
              Link enviado para o email!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
}

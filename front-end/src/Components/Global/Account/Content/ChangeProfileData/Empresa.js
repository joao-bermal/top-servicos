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
import updateStorage from "../../../../../Utils/updateStorage";

import Title from "../../../../Global/Title";
import { telefoneMask } from "../../../../../Utils/masks";
import { useNavigate } from "react-router-dom";

export default function ChangeProfileDataEmpresa() {
  const [formValues, setFormValues] = useState({
    id: JSON.parse(localStorage.getItem("user")).id,
    cnpj: JSON.parse(localStorage.getItem("user")).cnpj,
    razao_social: JSON.parse(localStorage.getItem("user")).razao_social,
    email: JSON.parse(localStorage.getItem("user")).email,
    telefone: JSON.parse(localStorage.getItem("user")).telefone,
  });
  const [disabled, setDisabled] = useState({
    cnpj: true,
    razao_social: true,
    email: true,
    telefone: true,
  });

  const [open, setOpen] = useState({ success: false, error: false });
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8000",
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

  const handleEnable = (identifier) => {
    let newForm = { ...disabled };
    newForm[identifier] = !disabled[identifier];
    setDisabled(newForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formValues.razao_social != "" &&
      formValues.email != "" &&
      formValues.telefone != ""
    )
      api
        .post("/update-empresa", formValues)
        .then((response) => {
          updateStorage();
          return setOpenValue("success", true);
        })
        .catch((error) => {
          return setOpenValue("error", true);
        });
    else return setOpenValue("error", true);
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
            disabled={disabled.cnpj}
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="cnpj"
            label="CNPJ"
            name="cnpj"
            autoComplete="cnpj"
            value={formValues.cnpj}
            onChange={(event) => {
              handleFormChange(event.target.value, "cnpj");
            }}
          />
          <TextField
            color="primary"
            disabled={disabled.razao_social}
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="name"
            label="Razão Social"
            name="name"
            autoComplete="name"
            autoFocus
            value={formValues.razao_social}
            onChange={(event) => {
              handleFormChange(event.target.value, "razao_social");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => handleEnable("razao_social")}
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
            open={open.success}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSuccess}
              variant="filled"
              severity="success"
              sx={{ width: "100%" }}
            >
              Dados alterados com sucesso!
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
              Não foi possível concluir a operação.
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
}

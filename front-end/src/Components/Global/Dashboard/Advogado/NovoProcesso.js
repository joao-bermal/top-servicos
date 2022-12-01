import { useEffect, useState, useCallback } from "react";

import Title from "../../Title";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function NovoProcesso() {
  const [formValues, setFormValues] = useState({
    nome: "",
    tipo: "",
    status: "Aberto",
    descricao: "",
    empresa_cnpj: "",
    funcionario_cpf: JSON.parse(localStorage.getItem("user")).cpf,
  });
  const [empresas, setEmpresas] = useState([]);
  const [open, setOpen] = useState({ success: false, error: false });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formValues.nome != "" &&
      formValues.tipo != "" &&
      formValues.descricao != "" &&
      formValues.empresa_cnpj != ""
    )
      await api
        .post("/add-processo", formValues)
        .then((response) => {
          return setOpenValue("success", true);
        })
        .catch((error) => {
          return setOpenValue("error", true);
        });
    else return setOpenValue("error", true);
  };

  useEffect(() => {
    api.get("/empresas-nome-cnpj").then((response) => {
      const empresasArray = response.data;
      empresasArray.map((empresa) => {
        setEmpresas((current) => [
          ...current,
          `${empresa.cnpj} (${empresa.razao_social})`,
        ]);
      });
    });
  }, []);

  return (
    <>
      <Title>Criar novo processo</Title>
      <Box
        sx={{
          mt: 8,
          height: "90%",
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
            width: "100%",
            alignItems: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="name"
            label="Nome do processo"
            name="name"
            autoComplete="name"
            autoFocus
            value={formValues.nome}
            onChange={(event) => {
              handleFormChange(event.target.value, "nome");
            }}
          />
          <TextField
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="type"
            label="Tipo"
            name="type"
            autoComplete="type"
            value={formValues.tipo}
            onChange={(event) => {
              handleFormChange(event.target.value, "tipo");
            }}
          />
          <TextField
            margin="normal"
            required
            sx={{ width: "90%" }}
            id="description"
            label="Descrição"
            name="description"
            autoComplete="description"
            value={formValues.descricao}
            onChange={(event) => {
              handleFormChange(event.target.value, "descricao");
            }}
          />
          <Autocomplete
            sx={{ width: "90%", mt: 2 }}
            required
            disablePortal
            id="empresa_cnpj"
            options={empresas}
            onChange={(event, newValue) => {
              handleFormChange(newValue.slice(0, 18), "empresa_cnpj");
            }}
            renderInput={(params) => (
              <TextField {...params} label="CNPJ da empresa" />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 5, mb: 2, backgroundColor: "#000000", width: "90%" }}
            onClick={handleSubmit}
          >
            Criar
          </Button>
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
              Processo criado com sucesso!
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
              Erro ao criar o processo.
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
}

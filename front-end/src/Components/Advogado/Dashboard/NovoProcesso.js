import { useEffect, useState, useCallback } from "react";

import Title from "../../Global/Title/index.js";
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
    funcionario_cpf: "",
  });
  const [empresas, setEmpresas] = useState([]);
  const [advogados, setAdvogados] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // let newForm = { ...formValues };
    // newForm["empresa_cnpj"] = formValues.empresa_cnpj.slice(0, 18);
    // newForm["funcionario_cpf"] = formValues.funcionario_cpf.slice(0, 14);
    // // debugger;
    // setFormValues(newForm);
    if (
      formValues.nome != "" &&
      formValues.tipo != "" &&
      formValues.descricao != "" &&
      formValues.empresa_cnpj != "" &&
      formValues.funcionario_cpf != ""
    )
      await api
        .post("/add-processo", formValues)
        .then((response) => {
          return setOpen(true);
        })
        .catch((error) => {
          setErrorMessage("Falha na requisição.");
        });
    else setErrorMessage("Dados Inválidos. Tente novamente!");
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

    api.get("/advogados-nome-cpf").then((response) => {
      const advogadosArray = response.data;
      advogadosArray.map((advogado) => {
        setAdvogados((current) => [
          ...current,
          `${advogado.cpf} (${advogado.nome})`,
        ]);
      });
    });
  }, []);

  return (
    <>
      <Title>Criar novo processo</Title>
      <Box
        sx={{
          mt: 2,
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
            // freeSolo
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
          <Autocomplete
            // freeSolo
            sx={{ width: "90%", mt: 3 }}
            required
            disablePortal
            id="funcionario_cpf"
            options={advogados}
            onChange={(event, newValue) => {
              handleFormChange(newValue.slice(0, 14), "funcionario_cpf");
            }}
            renderInput={(params) => (
              <TextField {...params} label="CPF do advogado encarregado" />
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
          {/* add hover color as white */}
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
              Processo criado com sucesso!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
}

import { useEffect, useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { onHandleUpdate } from "../../../../features/handleUpdate";

import Title from "../../Title";
import { Box, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import RegularCustomToolbar from "../RegularCustomToolbar";

export default function Historico() {
  const [empresas, setEmpresas] = useState([]);

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState({
    update: false,
    delete: false,
    error: false,
  });

  const dispatch = useDispatch();
  const handleUpdate = useSelector((state) => state.handleUpdate.value);

  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 200,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 150,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      valueOptions: ["Aberto", "Em andamento", "Concluído", "Arquivado"],
    },
    {
      field: "descricao",
      headerName: "Descrição",
      width: 300,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "empresa_cnpj",
      headerName: "CNPJ da Empresa",
      width: 150,
      headerAlign: "center",
      align: "center",
      editable: true,
      type: "singleSelect",
      valueOptions: empresas,
    },
    {
      field: "time_created",
      headerName: "Data de criação",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) =>
        new Date(params.row.time_created).toLocaleDateString(),
    },
    {
      field: "delete",
      disableExport: true,
      headerName: "",
      width: 60,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const onClick = (e) => {
          const gridApi = params.api;
          const thisRow = {};

          gridApi
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          api
            .delete(`/delete-processo/${thisRow.id}`)
            .then((response) => {
              dispatch(onHandleUpdate());
              return setOpenValue("delete", true);
            })
            .catch((error) => {
              setOpenValue("error", true);
            });
        };

        return (
          <IconButton aria-label="delete" color="error" onClick={onClick}>
            <CloseIcon />
          </IconButton>
        );
      },
    },
  ];

  const setOpenValue = (identifier, value) => {
    let newValue = { ...open };
    newValue[identifier] = value;
    setOpen(newValue);
  };

  const handleCloseUpdate = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenValue("update", false);
  };

  const handleCloseDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenValue("delete", false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenValue("error", false);
  };

  const handleRowEditCommit = async (params) => {
    const updatedValues = {
      updated_field: params.field,
      updated_value: params.value,
    };
    api
      .put(`/update_processo/${params.id}`, updatedValues)
      .then((response) => {
        dispatch(onHandleUpdate());
        return setOpenValue("update", true);
      })
      .catch((error) => {
        setOpenValue("error", true);
      });
  };

  useEffect(() => {
    setEmpresas([]);
    const userId = JSON.parse(localStorage.getItem("user")).id;
    api
      .get(`/processos-em-andamento-cpf/${userId}`)
      .then((response) => setRows(response.data));

    api.get("/empresas-nome-cnpj").then((response) => {
      const empresasArray = response.data;
      empresasArray.map((empresa) => {
        setEmpresas((current) => [...current, `${empresa.cnpj}`]);
      });
    });
  }, [handleUpdate]);

  return (
    <>
      <Title>Processos em andamento</Title>
      <Box sx={{ mt: 2, height: "90%", width: "100%" }}>
        <DataGrid
          columnBuffer={2}
          columnThreshold={2}
          density="comfortable"
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          onCellEditCommit={handleRowEditCommit}
          localeText={{
            toolbarColumns: "Colunas",
            toolbarFilters: "Filtros",
            toolbarDensity: "Densidade",
            toolbarExport: "Exportar",
          }}
          components={{
            Toolbar: RegularCustomToolbar,
          }}
        />
        <Snackbar
          open={open.update}
          autoHideDuration={3000}
          onClose={handleCloseUpdate}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseUpdate}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Campo atualizado com sucesso!
          </Alert>
        </Snackbar>
        <Snackbar
          open={open.delete}
          autoHideDuration={3000}
          onClose={handleCloseDelete}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseDelete}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Campo deletado com sucesso!
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
    </>
  );
}

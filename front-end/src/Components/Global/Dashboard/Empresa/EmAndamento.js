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
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState({ update: false, delete: false });

  const dispatch = useDispatch();
  const handleUpdate = useSelector((state) => state.handleUpdate.value);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_DEV_ADDRESS,
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
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
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
    },
    {
      field: "funcionario_cpf",
      headerName: "CPF do Advogado",
      width: 150,
      headerAlign: "center",
      align: "center",
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
        console.log(error);
      });
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    api
      .get(`/processos-em-andamento-cnpj/${userId}`)
      .then((response) => setRows(response.data));
  }, [handleUpdate]);

  return (
    <>
      <Title>Meus processos em andamento</Title>
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
      </Box>
    </>
  );
}

import { useEffect, useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { onChangeSelection } from "../../../../features/selectedRows";
import { onHandleUpdate } from "../../../../features/handleUpdate";

import Title from "../../Title/";
import { Box, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import AdvogadosToolbar from "../AdvogadosToolbar";

import { cnpjMask } from "../../../../Utils/masks";

export default function Empresas() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState({ update: false, delete: false });

  const dispatch = useDispatch();
  const selectedRows = useSelector((state) => state.selectedRows.value);
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
      field: "cnpj",
      headerName: "CNPJ",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueParser: (value) => {
        return cnpjMask(value);
      },
    },
    {
      field: "razao_social",
      headerName: "Razão social",
      width: 250,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "telefone",
      headerName: "Telefone",
      width: 150,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "senha",
      headerName: "Senha",
      width: 150,
      headerAlign: "center",
      align: "center",
      editable: true,
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
      .put(`/update-empresa/${params.id}`, updatedValues)
      .then((response) => {
        dispatch(onHandleUpdate());
        return setOpenValue("update", true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    api.get("/empresas-all-info").then((response) => setRows(response.data));
  }, [handleUpdate]);

  return (
    <>
      <Title>Gerenciamento de empresas</Title>
      <Box sx={{ mt: 2, height: "90%", width: "100%" }}>
        <DataGrid
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
            Toolbar: AdvogadosToolbar,
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

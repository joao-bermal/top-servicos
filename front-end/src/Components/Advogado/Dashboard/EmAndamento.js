import { useEffect, useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { onHandleUpdate } from "../../../features/handleUpdate";

import Title from "./Title";
import { Box, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import RegularCustomToolbar from "./RegularCustomToolbar";

export default function Historico() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState({ update: false, delete: false });

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
      width: 150,
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
      editable: true,
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      valueOptions: ["Aberto", "Em andamento", "Concluído", "Arquivado"],
    },
    {
      field: "descricao",
      headerName: "Descrição",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "empresa_cnpj",
      headerName: "CNPJ da Empresa",
      width: 150,
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
    {
      field: "delete",
      headerName: "",
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
              console.log(error);
            });
          // return alert(JSON.stringify(thisRow, null, 4));
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

  const handleRowEditCommit = async (params) => {
    const updatedValues = {
      // response_type: "finalizados",
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
    api
      .get("/processos-em-andamento")
      .then((response) => setRows(response.data));
  }, [handleUpdate]);

  return (
    <>
      <Title>Processos em andamento</Title>
      <Box sx={{ mt: 2, height: "90%", width: "100%" }}>
        <DataGrid
          density="comfortable"
          rows={rows}
          columns={columns}
          // checkboxSelection
          disableSelectionOnClick
          onCellEditCommit={handleRowEditCommit}
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

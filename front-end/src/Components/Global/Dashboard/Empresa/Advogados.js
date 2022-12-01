import { useEffect, useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { onHandleUpdate } from "../../../../features/handleUpdate";

import Title from "../../Title";
import { Box, IconButton, Snackbar, Alert } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import AdvogadosToolbar from "../AdvogadosToolbar";

export default function Advogados() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState({ update: false, delete: false });

  const dispatch = useDispatch();
  const handleUpdate = useSelector((state) => state.handleUpdate.value);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_DEV_ADDRESS,
  });

  const columns = [
    {
      field: "cpf",
      headerName: "CPF",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "telefone",
      headerName: "Telefone",
      width: 300,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "emailButton",
      disableExport: true,
      headerName: "",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const getUrl = (e) => {
          const gridApi = params.api;
          const thisRow = {};
          const email = {};
          const user = JSON.parse(localStorage.getItem("user"));

          gridApi
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          email["cc"] = thisRow.email;
          email["subject"] = `Contato de ${user.razao_social}`;
          email[
            "body"
          ] = `Olá, eu sou da ${user.razao_social} e gostaria de entrar em contato.`;

          const url = `mailto:${email.cc}?subject=${email.subject}&body=${email.body}`;
          return url;
        };

        return (
          <IconButton aria-label="email" target="_blank" href={getUrl()}>
            <MailIcon />
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
    api.get("/advogados").then((response) => setRows(response.data));
  }, [handleUpdate]);

  return (
    <>
      <Title>Advogados da Topservicos</Title>
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
            toolbarFilters: "Filtros",
            toolbarDensity: "Densidade",
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

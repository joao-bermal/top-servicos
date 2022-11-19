import { useEffect, useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { onChangeSelection } from "../../../features/selectedRows";

import Title from "./Title";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import CustomToolbar from "./CustomToolbar";

export default function Historico() {
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();
  const selectedRows = useSelector((state) => state.selectedRows.value);
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

          return alert(JSON.stringify(thisRow, null, 4));
        };

        return (
          <IconButton aria-label="delete" color="error" onClick={onClick}>
            <CloseIcon />
          </IconButton>
        );
      },
    },
  ];

  const handleRowEditCommit = async (params) => {
    const updatedValues = {
      response_type: "finalizados",
      updated_field: params.field,
      updated_value: params.value,
    };
    api
      .put(`/update_processo/${params.id}`, updatedValues)
      .then((response) => {
        setRows(response.data);
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    api
      .get("/processos-finalizados")
      .then((response) => setRows(response.data));
  }, [handleUpdate]);

  return (
    <>
      <Title>Processos finalizados</Title>
      <Box sx={{ mt: 2, height: "90%", width: "100%" }}>
        <DataGrid
          // density="compact"
          rows={rows}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            dispatch(onChangeSelection(newSelectionModel));
          }}
          selectionModel={selectedRows}
          onCellEditCommit={handleRowEditCommit}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </>
  );
}

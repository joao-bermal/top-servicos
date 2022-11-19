import { useEffect, useState, useCallback } from "react";

import Title from "./Title";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

import { cpfMask, cnpjMask } from "../../../Utils/masks";

export default function EmAndamento() {
  const [rows, setRows] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "nome",
      headerName: "Nome",
      width: 150,
      editable: true,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 120,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Aberto", "Em andamento", "Concluído", "Arquivado"],
    },
    {
      field: "descricao",
      headerName: "Descrição",
      width: 160,
      editable: true,
    },
    {
      field: "empresa_cnpj",
      headerName: "CNPJ da Empresa",
      width: 150,
      editable: true,
      valueParser: (value) => {
        return cnpjMask(value);
      },
    },
    {
      field: "funcionario_cpf",
      headerName: "CPF do Advogado",
      width: 150,
      editable: true,
      valueParser: (value) => {
        return cpfMask(value);
      },
    },
    {
      field: "time_created",
      headerName: "Data de criação",
      width: 150,
      valueGetter: (params) =>
        new Date(params.row.time_created).toLocaleDateString(),
    },
    {
      field: "delete",
      headerName: "Deletar",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

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
          <IconButton aria-label="delete" onClick={onClick}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const handleRowEditCommit = async (params) => {
    const updatedValues = {
      response_type: "em_andamento",
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
      .get("/processos-em-andamento")
      .then((response) => setRows(response.data));
  }, []);

  return (
    <>
      <Title>Processos em andamento</Title>
      <Box sx={{ mt: 2, height: "90%", width: "100%" }}>
        <DataGrid
          density="comfortable"
          rows={rows}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          onCellEditCommit={handleRowEditCommit}
        />
      </Box>
    </>
  );
}

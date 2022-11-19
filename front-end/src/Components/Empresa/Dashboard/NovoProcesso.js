import { useEffect, useState, useCallback } from "react";

import Title from "./Title";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function NovoProcesso() {
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
      // type: "number",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Aberto", "Em andamento", "Finalizado"],
    },
    {
      field: "descricao",
      headerName: "Descrição",
      width: 160,
      editable: true,
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "empresa_cnpj",
      headerName: "CNPJ da Empresa",
      width: 150,
    },
    {
      field: "funcionario_cpf",
      headerName: "CPF do Advogado",
      width: 150,
    },
    {
      field: "time_created",
      headerName: "Data de criação",
      width: 150,
      valueGetter: (params) =>
        new Date(params.row.time_created).toLocaleDateString(),
    },
  ];

  // const convertDate = (rows) => {
  //   rows.forEach(
  //     (row) =>
  //       (row.time_created = new Date(row.time_created).toLocaleDateString())
  //   );

  //   return rows;
  // };

  // const handleProcessRowUpdateError = useCallback((error) => {
  //   console.log({ children: error.message, severity: "error" });
  // }, []);

  const handleRowEditCommit = async (params) => {
    const updatedValues = {
      updated_field: params.field,
      updated_value: params.value,
    };
    debugger;
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
      <Title>Criar novo processo</Title>
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

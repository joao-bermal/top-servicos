import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { onHandleUpdate } from "../../../features/handleUpdate";

import axios from "axios";

import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { Button, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomToolbarProcessos = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const selectedRows = useSelector((state) => state.selectedRows.value);
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_DEV_ADDRESS,
  });

  const handleCloseDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getParamsUrl = (array) => {
    let paramsUrl = "";
    array.map((item) => (paramsUrl = paramsUrl + `listProcessos=${item}&`));
    return paramsUrl;
  };

  const toggleDeleteRows = () => {
    api
      .delete(`/delete-processos/?${getParamsUrl(selectedRows)}`)
      .then((response) => {
        dispatch(onHandleUpdate());
        return setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        alignContent: "flex-start",
        m: 1,
      }}
    >
      <GridToolbarColumnsButton sx={{ color: "#0000EE" }} />
      <GridToolbarFilterButton sx={{ color: "#0000EE" }} />
      <GridToolbarDensitySelector sx={{ color: "#0000EE" }} />

      <GridToolbarExport
        sx={{ color: "#0000EE" }}
        csvOptions={{
          fileName: "processos",
          delimiter: ";",
          utf8WithBom: true,
          allColumns: true,
        }}
      />
      <Button
        sx={{ color: "#0000EE" }}
        size="small"
        startIcon={<DeleteIcon />}
        onClick={toggleDeleteRows}
      >
        Deletar
      </Button>
      <Snackbar
        open={open}
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
          Campos deletados com sucesso!
        </Alert>
      </Snackbar>
    </GridToolbarContainer>
  );
};

export default CustomToolbarProcessos;

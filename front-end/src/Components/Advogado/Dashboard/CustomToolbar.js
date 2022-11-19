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

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomToolbar = () => {
  const dispatch = useDispatch();

  const selectedRows = useSelector((state) => state.selectedRows.value);
  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

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
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "40%",
        m: 1,
      }}
    >
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />

      <GridToolbarExport
        csvOptions={{
          fileName: "historico-de-processos",
          delimiter: ";",
          utf8WithBom: true,
        }}
      />
      <Button
        color="primary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={toggleDeleteRows}
      >
        Delete
      </Button>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;

import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const RegularCustomToolbar = () => {
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
          fileName: "processos-em-andamento",
          delimiter: ";",
          utf8WithBom: true,
          allColumns: true,
        }}
      />
    </GridToolbarContainer>
  );
};

export default RegularCustomToolbar;

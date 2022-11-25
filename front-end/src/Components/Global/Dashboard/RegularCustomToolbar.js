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
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />

      <GridToolbarExport
        csvOptions={{
          fileName: "processos-em-andamento",
          delimiter: ";",
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
};

export default RegularCustomToolbar;

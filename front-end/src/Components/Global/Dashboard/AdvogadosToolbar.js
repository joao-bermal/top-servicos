import {
  GridToolbarContainer,
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
      <GridToolbarFilterButton sx={{ color: "#0000EE" }} />
      <GridToolbarDensitySelector sx={{ color: "#0000EE" }} />
    </GridToolbarContainer>
  );
};

export default RegularCustomToolbar;

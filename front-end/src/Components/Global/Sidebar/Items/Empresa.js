import * as React from "react";
import { useDispatch } from "react-redux";
import { onChangeContent } from "../../../../features/selectedContent";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { Dashboard, ManageSearch, Contacts } from "@mui/icons-material";

const EmpresaItems = () => {
  const dispatch = useDispatch();
  const [isContentSelected, setIsContentSelected] = React.useState({
    emAndamento: true,
    historico: false,
    advogados: false,
  });

  const selectContent = (identifier) => {
    let newState = {
      emAndamento: false,
      historico: false,
      advogados: false,
    };
    newState[identifier] = true;
    setIsContentSelected(newState);
  };

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Meus processos
      </ListSubheader>
      <ListItemButton
        selected={isContentSelected.emAndamento}
        onClick={() => {
          selectContent("emAndamento");
          dispatch(onChangeContent("Em andamento"));
        }}
      >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Em andamento" />
      </ListItemButton>
      <ListItemButton
        selected={isContentSelected.historico}
        onClick={() => {
          selectContent("historico");
          dispatch(onChangeContent("Histórico"));
        }}
      >
        <ListItemIcon>
          <ManageSearch />
        </ListItemIcon>
        <ListItemText primary="Histórico" />
      </ListItemButton>
      <ListSubheader component="div" inset sx={{ mt: 2 }}>
        Advogados
      </ListSubheader>
      <ListItemButton
        selected={isContentSelected.advogados}
        onClick={() => {
          selectContent("advogados");
          dispatch(onChangeContent("Advogados"));
        }}
      >
        <ListItemIcon>
          <Contacts />
        </ListItemIcon>
        <ListItemText primary="Contato" />
      </ListItemButton>
    </React.Fragment>
  );
};
export default EmpresaItems;

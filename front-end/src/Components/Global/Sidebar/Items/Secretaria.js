import * as React from "react";
import { useDispatch } from "react-redux";
import { onChangeContent } from "../../../../features/selectedContent";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { Business, Contacts, Dashboard } from "@mui/icons-material";

const SecretariaItems = () => {
  const dispatch = useDispatch();
  const [isContentSelected, setIsContentSelected] = React.useState({
    empresas: true,
    advogados: false,
    processos: false,
  });

  const selectContent = (identifier) => {
    let newState = {
      empresas: false,
      advogados: false,
      processos: false,
    };
    newState[identifier] = true;
    setIsContentSelected(newState);
  };

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Gerenciamento
      </ListSubheader>
      <ListItemButton
        selected={isContentSelected.empresas}
        onClick={() => {
          selectContent("empresas");
          dispatch(onChangeContent("empresas"));
        }}
      >
        <ListItemIcon>
          <Business />
        </ListItemIcon>
        <ListItemText primary="Empresas" />
      </ListItemButton>
      <ListItemButton
        selected={isContentSelected.advogados}
        onClick={() => {
          selectContent("advogados");
          dispatch(onChangeContent("advogados"));
        }}
      >
        <ListItemIcon>
          <Contacts />
        </ListItemIcon>
        <ListItemText primary="Advogados" />
      </ListItemButton>
      <ListItemButton
        selected={isContentSelected.processos}
        onClick={() => {
          selectContent("processos");
          dispatch(onChangeContent("processos"));
        }}
      >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Processos" />
      </ListItemButton>
    </React.Fragment>
  );
};
export default SecretariaItems;

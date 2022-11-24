import * as React from "react";
import { useDispatch } from "react-redux";
import { onChangeContent } from "../../../../features/selectedContent";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { Dashboard, ManageSearch, AddCircle } from "@mui/icons-material";

const AdvogadoItems = () => {
  const dispatch = useDispatch();
  const [isContentSelected, setIsContentSelected] = React.useState({
    emAndamento: true,
    historico: false,
    novoProcesso: false,
  });

  const selectContent = (identifier) => {
    let newState = {
      emAndamento: false,
      historico: false,
      novoProcesso: false,
    };
    newState[identifier] = true;
    setIsContentSelected(newState);
  };

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Processos
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
      <ListItemButton
        selected={isContentSelected.novoProcesso}
        onClick={() => {
          selectContent("novoProcesso");
          dispatch(onChangeContent("Novo processo"));
        }}
      >
        <ListItemIcon>
          <AddCircle />
        </ListItemIcon>
        <ListItemText primary="Novo processo" />
      </ListItemButton>
    </React.Fragment>
  );
};
export default AdvogadoItems;

import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

const SearchBar = ({ searchIssues }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const descriptionRef = useRef("");

  const classes = useStyles();

  return (
    <Grid className={classes.searchBar}>
      <TextField
        label="Descreva o seu problema"
        variant="outlined"
        size="medium"
        inputRef={descriptionRef}
        className={classes.searchBarTextFiel}
        margin="dense"
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          inputVariant="outlined"
          format="dd/MM/yyyy"
          cancelLabel="Cancelar"
          label="De"
          autoOk
          className={classes.searchBarItem}
          margin="dense"
        />
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          inputVariant="outlined"
          format="dd/MM/yyyy"
          cancelLabel="Cancelar"
          label="Até"
          autoOk
          className={classes.searchBarItem}
          margin="dense"
        />
      </MuiPickersUtilsProvider>
      <Button
        onClick={() =>
          searchIssues(
            descriptionRef.current.value,
            startDate.toLocaleDateString("pt-BR"),
            endDate.toLocaleDateString("pt-BR")
          )
        }
        color="primary"
        variant="contained"
        startIcon={<SearchIcon />}
      >
        Pesquisar
      </Button>
    </Grid>
  );
};

// const categories = [{ name: "Descrição" }, { name: "Título" }];
export default SearchBar;

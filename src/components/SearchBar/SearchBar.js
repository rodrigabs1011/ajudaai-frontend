import React, { useState, useRef } from "react";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useMediaQuery } from "react-responsive";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const SearchBar = ({ searchIssues }) => {
  const [custom, setCustom] = useState(false);
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [open, setOpen] = useState(false);

  const descriptionRef = useRef("");

  const classes = useStyles();

  const isMobile = useMediaQuery({
    query: "(min-width: 0px) and (max-width: 800px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width: 801px) and (max-width: 1280px)",
  });

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1281px)",
  });

  const handleQueryChange = (event) => {
    if (event.key === "Enter") {
      searchIssues(
        descriptionRef.current.value,
        startDate.toLocaleDateString("pt-BR"),
        endDate.toLocaleDateString("pt-BR")
      );
    }
  };

  const handleDate = (value) => {
    if (value === true) {
      return setCustom(true);
    }
    setCustom(false);

    const auxStartDate = new Date();
    auxStartDate.setUTCDate(auxStartDate.getUTCDate() - value);
    setStartDate(auxStartDate);
    setEndDate(new Date());
    if (value === 1) {
      setEndDate(auxStartDate);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const customSearch = (
    <Box className={!isMobile ? classes.customSearchBar : null}>
      {isTablet ? (
        <Typography variant="h6" color="primary">
          Selecione o período
        </Typography>
      ) : null}
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
      {isTablet ? (
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
          startIcon={<SearchIcon />}>
          Filtrar
        </Button>
      ) : null}
    </Box>
  );
  const defaultSearch = (
    <Box className={classes.searchBar}>
      <Typography
        className={classes.searchBarTitle}
        variant="h6"
        color="primary">
        Pesquisar
      </Typography>
      <TextField
        label="Pesquisar"
        placeholder="Descreva seu problema"
        variant="outlined"
        size="medium"
        inputRef={descriptionRef}
        className={classes.searchBarTextFiel}
        margin="dense"
        onKeyPress={handleQueryChange}
      />
      <Autocomplete
        id="search-options"
        options={categories}
        size="small"
        disableClearable
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Período" variant="outlined" />
        )}
        onChange={(event, option) => {
          handleDate(option.value);
        }}
        className={classes.comboBox}
      />
      {custom && isDesktopOrLaptop ? customSearch : null}
      {custom && isMobile ? customSearch : null}
      {isTablet && custom ? (
        <>
          <Tooltip title="Pequisar">
            <Fab color="primary" size="small" onClick={handleOpen}>
              <SearchIcon />
            </Fab>
          </Tooltip>
          <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Fade in={open}>{customSearch}</Fade>
          </Modal>
        </>
      ) : isMobile ? (
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
          startIcon={<SearchIcon />}>
          Filtrar
        </Button>
      ) : (
        <Tooltip title="Pequisar">
          <Fab
            color="primary"
            size="small"
            onClick={() =>
              searchIssues(
                descriptionRef.current.value,
                startDate.toLocaleDateString("pt-BR"),
                endDate.toLocaleDateString("pt-BR")
              )
            }>
            <SearchIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Tooltip title="Pequisar">
            <Fab color="primary" size="small" onClick={handleOpen}>
              <SearchIcon />
            </Fab>
          </Tooltip>
          <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Fade in={open}>{defaultSearch}</Fade>
          </Modal>
        </>
      ) : isTablet ? (
        defaultSearch
      ) : (
        defaultSearch
      )}
    </>
  );
};

const categories = [
  { name: "Hoje", value: 0 },
  { name: "Ontem", value: 1 },
  { name: "Últimos 7 dias", value: 7 },
  { name: "Último mês", value: 30 },
  { name: "Personalizado", value: true },
];
export default SearchBar;

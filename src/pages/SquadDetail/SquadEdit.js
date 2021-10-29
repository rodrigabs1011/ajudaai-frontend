import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import ErrorMsg from "../../components/ErrorMsg";

import SquadClient from "../../services/squads";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    padding: "21px",
  },
  dialogHeader: {
    padding: "21px 21px 13px 21px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialogContent: {
    padding: "0 21px",
  },
  noPadding: { padding: 0 },
}));

const SquadEdit = ({ open, squad, setSquad, data, setData, handleClose }) => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleChange = (e) => {
    setError(undefined);
    setData({ name: e.target.value });
  };

  const handleSubmit = async (e) => {
    setError(undefined);
    try {
      setLoading(true);
      if (squad.name === data.name) throw Error("Nenhuma alteração realizada.");
      const auxSquad = await SquadClient.editSquad(id, data);
      setSquad(auxSquad);
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={loading ? () => {} : handleClose} fullWidth>
      <div className={classes.dialogHeader}>
        <DialogTitle className={classes.noPadding}>
          Editar <strong>{squad.name}</strong>
        </DialogTitle>
        <IconButton onClick={handleClose} disabled={loading}>
          <CloseIcon style={{ color: loading ? "#E0E0E0" : "#212121" }} />
        </IconButton>
      </div>
      <DialogContent className={classes.dialogContent}>
        <ErrorMsg error={error} />
        <TextField
          id="name"
          label="Nome"
          value={data.name}
          onChange={handleChange}
          variant="outlined"
          disabled={loading}
          fullWidth
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          disabled={loading || error ? true : undefined}
        >
          Cancelar
        </Button>
        {loading ? (
          <Button color="primary" variant="contained" disabled>
            <CircularProgress size={21} style={{ color: "white" }} />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={error ? true : undefined}
          >
            Salvar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SquadEdit;

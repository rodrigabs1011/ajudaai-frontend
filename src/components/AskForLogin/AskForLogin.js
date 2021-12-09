import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { GlobalContext } from "../../providers/GlobalProvider";

const AskForLogin = (props) => {
  const {
    //isAnonymous,
    setIsAnonymous,
    setAskForLoginVisible,
    askForLoginVisible,
  } = useContext(GlobalContext);

  const handleSubmit = () => {
    // ENDPOINT TO CREATE ANONYMOUS USER
    setIsAnonymous(true);
    setAskForLoginVisible(false);
  };

  const handleClose = () => {
    // ENDPOINT TO CREATE ANONYMOUS USER
    setAskForLoginVisible(false);
  };

  return (
    <Dialog
      open={askForLoginVisible}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Deseja fazer o login?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja fazer o login para interagir ou quer continuar de maneira anonima?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Continuar Anonimamente
        </Button>
        <Button
          component={Link}
          to={`/login/`}
          onClick={handleClose}
          color="primary"
          autoFocus
        >
          Fazer Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AskForLogin;

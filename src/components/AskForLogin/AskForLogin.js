import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";

import { GlobalContext } from "../../providers/GlobalProvider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import AuthService from "../../services/auth";
import ErrorMsg from "../ErrorMsg";

const AskForLogin = (props) => {
  const classes = useStyles();

  const {
    setAskForLoginVisible,
    askForLoginVisible,
    setIsAuthenticated, // eslint-disable-line
  } = useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [name, setName] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleLogin = async () => {
    try {
      setLoginError(undefined);
      setLoginLoading(true);
      const data = await AuthService.signin({ username, password });
      localStorage.setItem("AJUDAAI-SESSION-TOKEN", data.token);
      setIsAuthenticated(true);
      setAskForLoginVisible(false);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setNameError(undefined);
      setNameLoading(true);
      const data = await AuthService.fastSignUp({ name });
      localStorage.setItem("AJUDAAI-SESSION-TOKEN", data.token);
      setIsAuthenticated(true);
      setAskForLoginVisible(false);
    } catch (error) {
      setNameError(error.message);
    } finally {
      setNameLoading(false);
    }
  };

  const handleClose = () => {
    setAskForLoginVisible(false);
  };

  return (
    <Dialog
      open={askForLoginVisible}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title">
      <form>
        <DialogContent>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.dialogSubtitle}>
            Entrar
          </Typography>
          <TextField
            className={classes.dialogField}
            label="Usuário"
            placeholder="Usuário"
            value={username}
            onChange={(event) => {
              setLoginError(undefined);
              setUsername(event.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
            disabled={loginLoading}
          />
          <TextField
            className={classes.dialogField}
            label="Senha"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(event) => {
              setLoginError(undefined);
              setPassword(event.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
            disabled={loginLoading}
          />
          <ErrorMsg error={loginError} message="Usuário ou Senha inválido(a)" />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loginError || loginLoading ? true : false}
            className={classes.dialogSubmit}>
            Entrar
          </Button>

          <Divider className={classes.dialogDivider} />

          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.dialogSubtitle}>
            Criar Conta
          </Typography>
          <TextField
            className={classes.dialogField}
            label="Nome"
            placeholder="Nome"
            value={name}
            onChange={(event) => {
              setNameError(undefined);
              setName(event.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
          />
          <ErrorMsg error={nameError} message="Nome de usuário inválido" />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            className={classes.dialogSubmit}
            disabled={nameLoading || nameError ? true : false}
            onClick={handleSignUp}>
            Criar Conta
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default AskForLogin;

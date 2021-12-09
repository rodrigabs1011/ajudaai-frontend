import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { GlobalContext } from "../../providers/GlobalProvider";
import AuthService from "../../services/auth";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

import ErrorMsg from "../../components/ErrorMsg";

const Login = () => {
  const classes = useStyles();
  const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const auxFormData = formData;
    auxFormData[e.target.name] = e.target.value;
    setFormData(auxFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(undefined);
      const data = await AuthService.signin(formData);
      localStorage.setItem("AJUDAAI-SESSION-TOKEN", data.token);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return isAuthenticated ? (
    <Redirect to="/"></Redirect>
  ) : (
    <main>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xl={6} lg={6}>
          <ErrorMsg error={error} />
        </Grid>
        <Grid item xl={6} lg={6}>
          <Typography variant="h6" color="textPrimary">
            Entrar
          </Typography>
        </Grid>
        <Grid item xl={6} lg={6}>
          <form className={classes.formRoot} onSubmit={handleSubmit}>
            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="Usuário"
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
            />

            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="Senha"
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
            />
            <Button variant="contained" color="primary" disabled={loading} type="submit" className={classes.loginSubmit}>
              Entrar
            </Button>
          </form>
        </Grid>
      </Grid>
    </main>
  );
};

export default Login;

import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { isAuthenticated } from "../../utils/auth";

import Logout from "../Logout";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";
import infinity from "../../assets/infinity.svg";

const NavBar = () => {
  const classes = useStyles();
  const { reportFormVisible, setReportFormVisible } = useContext(GlobalContext);

  let navLinks = (
    <>
      <li>
        <Link className={classes.navItem} to="/"> {/* TODO: to="/about" */}
          Inicio
        </Link>
      </li>
    </>
  );
  if (isAuthenticated) {
    navLinks = (
      <>
        <li>
          <Link className={classes.navItem} to="/">
            Inicio
          </Link>
        </li>
        <Logout></Logout>
      </>
    );
  }
  return (
    <header id="navbar" className={classes.root}>
      <nav className={classes.nav}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/" className={classes.brandWrapper}>
            {/* <img className={classes.brandImage} src={infinity} alt="Logo" /> */}
            <Typography variant="h1" className={classes.brandText}>
              AJUDAAÍ
            </Typography>
          </Link>

          <div className={classes.row}>
            <ul className={classes.navList}>{navLinks}</ul>
            <Button variant="contained" color="primary" onClick={() => {setReportFormVisible(!reportFormVisible)}}>POSTAR</Button>
          </div>
        </Grid>
      </nav>
    </header>
  );
};

export default NavBar;

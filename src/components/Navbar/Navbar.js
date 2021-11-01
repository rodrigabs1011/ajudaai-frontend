import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';

import { isAuthenticated } from "../../utils/auth";

import Logout from "../Logout";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();
  const { reportFormVisible, setReportFormVisible } = useContext(GlobalContext);

  const closeReportForm = () => {
    setReportFormVisible(false);
  };

  const openReportForm = () => {
    setReportFormVisible(true);
  };

  let navLinks = (<></>)
  // (
  //   <>
  //     <li>
  //       <Link className={classes.navItem} to="/">
  //         {/* TODO: to="/about" */}
  //         Inicio
  //       </Link>
  //     </li>
  //   </>
  // );

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
          {reportFormVisible ? (
            <>
              <IconButton onClick={closeReportForm}>
                <ArrowBackIcon />
              </IconButton>
              <Link to="/" onClick={closeReportForm}>
                <Typography variant="h2" className={classes.brandText}>
                  AJUDA AÍ
                </Typography>
              </Link>
              <IconButton onClick={closeReportForm}>
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Link to="/" className={classes.brandWrapper}>
                {/* <img className={classes.brandImage} src={infinity} alt="Logo" /> */}
                <Typography variant="h2" className={classes.brandText}>
                  AJUDA AÍ
                </Typography>
              </Link>

              <div className={classes.row}>
                <ul className={classes.navList}>{navLinks}</ul>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openReportForm}
                  endIcon={<MarkunreadMailboxIcon />}
                >
                  POSTAR
                </Button>
              </div>
            </>
          )}
        </Grid>
      </nav>
    </header>
  );
};

export default NavBar;

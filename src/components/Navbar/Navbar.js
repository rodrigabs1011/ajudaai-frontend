import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";

import Logout from "../Logout";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

const NavBar = ({ reRender }) => {
  const classes = useStyles();
  const { issueFormVisible, setIssueFormVisible, isAuthenticated, setIssues } =
    useContext(GlobalContext);

  const location = useLocation();
  const closeIssueForm = () => {
    setIssueFormVisible(false);
  };

  const openIssueForm = () => {
    setIssueFormVisible(true);
  };

  let navLinks = (
    <>
      <li>
        <Link className={classes.navItem} to="/login/">
          Entrar
        </Link>
      </li>
    </>
  );

  if (isAuthenticated) {
    navLinks = (
      <>
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
          alignItems="center">
          {issueFormVisible ? (
            <>
              <IconButton onClick={closeIssueForm}>
                <ArrowBackIcon />
              </IconButton>
              <Link to="/" onClick={closeIssueForm}>
                <Typography variant="h2" className={classes.brandText}>
                  AJUDA AÍ
                </Typography>
              </Link>
              <IconButton onClick={closeIssueForm}>
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              {location.pathname !== "/" ? (
                <Link
                  to="/"
                  className={classes.brandWrapper}
                  onClick={() => setIssues([])}>
                  {/* <img className={classes.brandImage} src={infinity} alt="Logo" /> */}
                  <Typography variant="h2" className={classes.brandText}>
                    AJUDA AÍ
                  </Typography>
                </Link>
              ) : (
                <Button
                  disableRipple
                  style={{ backgroundColor: "transparent" }}
                  onClick={() => reRender(1)}
                  className={classes.brandWrapper}>
                  {/* <img className={classes.brandImage} src={infinity} alt="Logo" /> */}
                  <Typography variant="h2" className={classes.brandText}>
                    AJUDA AÍ
                  </Typography>
                </Button>
              )}

              <div className={classes.row}>
                <ul className={classes.navList}>{navLinks}</ul>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openIssueForm}
                  endIcon={<MarkunreadMailboxIcon />}>
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

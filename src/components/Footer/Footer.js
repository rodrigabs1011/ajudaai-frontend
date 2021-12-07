import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Typography variant="body1" color="textSecondary">
          AJUDAAÍ, 2021. Imagens cortesia de{" "}
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              window.open("https://undraw.co/illustrations");
            }}>
            Undraw
          </Link>
        </Typography>
      </Grid>
    </footer>
  );
};

export default Footer;

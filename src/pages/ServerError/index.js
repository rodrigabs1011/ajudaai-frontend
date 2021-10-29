import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import { isAuthenticated } from "../../utils/auth";

import exclamation from "../../assets/exclamation.svg";

export default class ServerError extends Component {
  render() {
    const homePath = isAuthenticated ? "/" : "/about";
    return (
      <main>
        <Grid container direction="column" alignItems="center">
          <img src={exclamation} alt="" />
        </Grid>
        <Grid container direction="column" alignItems="center">
          <h1>Server Error</h1>
          <Link to={homePath}>Retry</Link>
        </Grid>
      </main>
    );
  }
}

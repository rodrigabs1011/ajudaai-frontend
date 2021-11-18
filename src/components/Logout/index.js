import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Logout extends Component {
  handleLogout = () => {
    localStorage.removeItem("AJUDAAI_SESSION_TOKEN");
    window.location = "/";
  };

  render() {
    return (
      <Button onClick={this.handleLogout} variant="outlined">
        <Typography variant="button" color="textSecondary">
          Sair
        </Typography>
      </Button>
    );
  }
}

export default withRouter(Logout);

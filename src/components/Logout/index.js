import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Logout extends Component {
  handleLogout = () => {
    localStorage.removeItem("AJUDAAI_SESSION_TOKEN");
    window.location = "/";
  };

  render() {
    return (
      <Button style={{color: '#FFF', borderColor: '#FFF', marginLeft: '13px'}} onClick={this.handleLogout} variant="outlined">
        Sair
      </Button>
    );
  }
}

export default withRouter(Logout);

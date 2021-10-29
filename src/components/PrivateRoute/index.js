import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";


export default class PrivateRoute extends Component {
  render() {
    const Component = this.props.component;
    return isAuthenticated ? <Component /> : <Redirect to="/signin" />;
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../../utils/auth";

export default class NotFound extends Component {
  render() {
    const homePath = isAuthenticated ? "/" : "/about";
    return (
      <main>
        <Link to={homePath}>Inicio</Link>
        <h1>Not Found</h1>
      </main>
    );
  }
}

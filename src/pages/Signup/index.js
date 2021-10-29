import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { isAuthenticated } from "../../utils/auth";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  render() {
    return isAuthenticated ? (
      <Redirect to="/"></Redirect>
    ) : (
      <main>
        <Link to="/signin">Já tem conta? Sign in</Link>

        <Link to="/about">Inicio</Link>

        <h2>SIGN UP</h2>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />

        <button>Submit</button>
      </main>
    );
  }
}

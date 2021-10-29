import axios from "axios";
import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { isAuthenticated } from "../../utils/auth";
import { headers } from "../../utils/core";
import { BASE_API_URL } from "../../utils/urls";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null,
      hasError: false,
      isLoading: false,
    };
  }

  async signin(data) {
    try {
      this.setState({ ...this.state, isLoading: true });
      const response = await axios.post(`${BASE_API_URL}/token-auth/`, data, {
        headers,
      });
      localStorage.setItem("AJUDAAI_SESSION_TOKEN", response.data.token);
      this.setState({
        hasError: false,
        isLoading: false,
      });
      window.location = "/";
    } catch (e) {
      this.setState({
        ...this.state,
        error: e.message,
        hasError: true,
        isLoading: false,
      });
    }
  }

  handleChange = (e) => {
    const name = e.target["name"];
    const value = e.target["value"];
    this.setState({ [name]: value, hasError: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.signin(data);
  };

  render() {
    /* let submitBtnClass = classNames({
      loading: this.state.isLoading,
      "mt-2": true,
    });

    let errorContainerClass = classNames({
      "error-container": true,
      visible: this.state.hasError,
    }); */

    return isAuthenticated ? (
      <Redirect to="/"></Redirect>
    ) : (
      <main>
        <div className="container color-gray-500">
          <div className="row flex justify-center">
            <h2 className="color-gray-700 text-center">Entrar</h2>

            <form className="flex flex-col justify-center"
              onSubmit={
                this.state.isLoading
                  ? (e) => {
                      e.preventDefault();
                    }
                  : this.handleSubmit
              }
            >
              <div className={"errorContainerClass"}>
                <div className="error-content">{this.state.error}</div>
              </div>
              <div className="row my-1">
                <label htmlFor="username_id">Usuário</label>
                <input
                  className="my-1"
                  id="username_id"
                  type="text"
                  name="username"
                  placeholder="Usuário"
                  onChange={this.handleChange}
                />
              </div>

              <div className="row mt-1">
                <label htmlFor="password_id">Senha</label>
                <input
                  className="mt-1"
                  id="password_id"
                  type="password"
                  name="password"
                  placeholder="Senha"
                  onChange={this.handleChange}
                />
              </div>

              <button
                disabled={this.state.isLoading}
                className={"submitBtnClass"}
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(Signin);

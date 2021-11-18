import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { GlobalContext } from "../../providers/GlobalProvider";
import AuthService from "../../services/auth";


const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const auxFormData = formData;
    auxFormData[e.target.name] = e.target.value;
    setFormData(auxFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(undefined);
      const data = await AuthService.signin(formData);
      localStorage.setItem("AJUDAAI_SESSION_TOKEN", data.token);
      setIsAuthenticated(true);
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return isAuthenticated ? (
    <Redirect to="/"></Redirect>
  ) : (
    <main>
      <div className="container color-gray-500">
        <div className="row flex justify-center">
          <h2 className="color-gray-700 text-center">Entrar</h2>

          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <div className={"errorContainerClass"}>
              <div className="error-content">{error}</div>
            </div>
            <div className="row my-1">
              <label htmlFor="username">Usuário</label>
              <input
                className="my-1"
                id="username"
                type="text"
                name="username"
                placeholder="Usuário"
                onChange={handleChange}
              />
            </div>

            <div className="row mt-1">
              <label htmlFor="password">Senha</label>
              <input
                className="mt-1"
                id="password"
                type="password"
                name="password"
                placeholder="Senha"
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className={"submitBtnClass"}
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;

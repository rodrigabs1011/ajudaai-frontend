import React, { Fragment, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";

import { GlobalContext } from "../providers/GlobalProvider";

import About from "../pages/About";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import IssueDetail from "../pages/IssueDetail";
import ServerError from "../pages/ServerError";

import AskForLogin from "../components/AskForLogin";

const Routes = () => {
  const { setIsAuthenticated, askForLoginVisible } = useContext(GlobalContext);

  useEffect(() => {
    setIsAuthenticated(
      localStorage.getItem("AJUDAAI_SESSION_TOKEN") ? true : false
    ); // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route exact path="/about/" component={About} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/issues/:slug/" component={IssueDetail} />
        <Route exact path="/500" component={ServerError} />
        <Route component={NotFound} />
      </Switch>
      {askForLoginVisible ? <AskForLogin /> : null}
    </Fragment>
  );
};

export default Routes;

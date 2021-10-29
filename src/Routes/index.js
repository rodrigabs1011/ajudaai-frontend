import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import About from "../pages/About";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import Signin from "../pages/Signin";
import SquadDetail from "../pages/SquadDetail";
import TribeDetail from "../pages/TribeDetail";
import TribeList from "../pages/TribeList";
import ServerError from "../pages/ServerError";

export default class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/about/" component={About} />
          <Route exact path="/signin/" component={Signin} />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/">
            <PrivateRoute component={Home}></PrivateRoute>
          </Route> */}
          {/* <Route exact path="/tribes/:id/">
            <PrivateRoute component={TribeDetail}></PrivateRoute>
          </Route>
          <Route exact path="/tribes/">
            <PrivateRoute component={TribeList}></PrivateRoute>
          </Route>
          <Route exact path="/squads/:id/">
            <PrivateRoute component={SquadDetail}></PrivateRoute>
          </Route> */}
          <Route exact path="/500" component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import Routes from "./Routes";

import "./styles/app.scss";

import MasterProvider from './providers/ProviderComposer';

const theme = createTheme({
  palette: {
    primary: grey
  },
});

export default class App extends Component {
  render() {
    return (
      <MasterProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      </MasterProvider>
    );
  }
}

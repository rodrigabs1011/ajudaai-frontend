import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Routes from "./Routes";

import "./styles/app.scss";

import MasterProvider from "./providers/ProviderComposer";

const theme = createTheme({
  typography: {
    fontFamily: `"Rubik", "Helvetica", "Arial", sans-serif`,
  },
});

const App = () => {
  return (
    <MasterProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </MasterProvider>
  );
};

export default App;

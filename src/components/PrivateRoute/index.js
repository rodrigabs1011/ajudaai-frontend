import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { GlobalContext } from "../../providers/GlobalProvider";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(GlobalContext);

  return isAuthenticated ? <Component /> : <Redirect to="/signin" />;
};

export default PrivateRoute;

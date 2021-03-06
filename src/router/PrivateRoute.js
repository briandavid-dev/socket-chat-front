import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const { isAuthenticated, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};

export default PrivateRoute;

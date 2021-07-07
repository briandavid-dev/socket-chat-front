import React, { useContext, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  // Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatPage from "../pages/ChatPage";
import AuthRouter from "./AuthRouter";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return "Espere p´lease";
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path="/auth" component={AuthRouter} /> */}
          <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          {/* <Route exact path="/" component={ChatPage} /> */}
          <PrivateRoute
            isAuthenticated={auth.logged}
            exact
            path="/"
            component={ChatPage}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;

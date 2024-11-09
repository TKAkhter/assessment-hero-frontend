import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../components/NotFound";
import AuthMiddleware from "../middlewares";
import CreateUser from "../pages/CreateUser";
import FileView from "../components/FileView";
import ShareView from "../components/ShareView";

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/create-user" component={CreateUser} />
      <Route path="/dashboard">
        <AuthMiddleware>
          <Dashboard />
        </AuthMiddleware>
      </Route>
      <Route path="/file/:imageName">
        <AuthMiddleware>
          <FileView />
        </AuthMiddleware>
      </Route>
      <Route path="/share/:imageName" component={ShareView} />
      <Route component={NotFound} />
    </Switch >
  );
};

export default AppRoutes;

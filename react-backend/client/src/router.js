import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./views/App";
import Error from "./views/Error";

import Index from "./views/index/Index";

import Database from "./views/database/Database";
import Analysis from "./views/database/analysis/Analysis";
import DBCtrl from "./views/database/control/BDCtrl";
import CSV from "./views/database/csv/CSV";

import Malfunction from "./views/malfunction/Malfunction";

import Processing from "./views/processing/Processing";

import Products from "./views/products/Products";

import Profile from "./views/profile/Profile";
import Settings from "./views/settings/Settings";

import Login from "./views/login/Login";

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/database/control" component={App} />
      <Route exact path="/database/analysis" component={App} />
      <Route exact path="/database/csv" component={App} />
      <Route exact path="/malfunction" component={App} />
      <Route exact path="/processing" component={App} />
      <Route exact path="/products" component={App} />
      <Route exact path="/profile" component={App} />
      <Route exact path="/settings" component={App} />
      <Route exact path="/login" component={App} />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>
);

// App Router
export const Main = () => (
  <div>
    <Route exact path="/" component={Index} />
    <Route path="/database" component={Database} />
    <Route path="/products" component={Products} />
    <Route path="/malfunction" component={Malfunction} />
    <Route path="/processing" component={Processing} />
    <Route path="/profile" component={Profile} />
    <Route path="/settings" component={Settings} />
    <Route path="/login" component={Login} />
  </div>
);

// Database Router
export const DBMain = () => (
  <div>
    <Route path="/database/control" component={DBCtrl} />
    <Route path="/database/analysis" component={Analysis} />
    <Route path="/database/csv" component={CSV} />
  </div>
);
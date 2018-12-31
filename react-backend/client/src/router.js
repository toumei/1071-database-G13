import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./views/App";
import Error from "./views/Error";

import Index from "./views/index/Index";

import Database from "./views/database/Database";
import Analysis from "./views/database/analysis/Analysis";
import Repair from "./views/database/analysis/Analysis.repair";
import MalfunctionMatter from "./views/database/analysis/Analysis.malfunctionMatter";
import Cabinet from "./views/database/analysis/Analysis.cabinet";
import ProcessingResult from "./views/database/analysis/Analysis.processingResult";
import Sweep from "./views/database/analysis/Analysis.sweep";
import Apply from "./views/database/analysis/Analysis.apply";

import CRUD from "./views/database/crud/CRUD";
import CSV from "./views/database/csv/CSV";
import Control from "./views/database/control/Control";

import Malfunction from "./views/repair/Malfunction";
import Processing from "./views/repair/Processing";

import Products from "./views/products/Products";

import Profile from "./views/user/Profile";
import Settings from "./views/user/Settings";
import Login from "./views/user/Login";

// 全部router都要在此先註冊
export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/database" component={App} />
      <Route exact path="/database/cabinet" component={App} />
      <Route exact path="/database/apply" component={App} />
      <Route exact path="/database/malfunctionMatter" component={App} />
      <Route exact path="/database/processingResult" component={App} />
      <Route exact path="/database/sweep" component={App} />
      <Route exact path="/database/crud" component={App} />
      <Route exact path="/database/csv" component={App} />
      <Route exact path="/database/control" component={App} />
      <Route exact path="/repair/malfunction" component={App} />
      <Route exact path="/repair/processing" component={App} />
      <Route exact path="/products" component={App} />
      <Route exact path="/user/profile" component={App} />
      <Route exact path="/user/settings" component={App} />
      <Route exact path="/user/login" component={App} />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>
);

// App Router
export const Main = () => (
  <div>
    <Route exact path="/" component={Index} />
    <Route path="/database" component={Database} />
    <Route path="/repair/malfunction" component={Malfunction} />
    <Route path="/repair/processing" component={Processing} />
    <Route path="/products" component={Products} />
    <Route path="/user/profile" component={Profile} />
    <Route path="/user/settings" component={Settings} />
    <Route path="/user/login" component={Login} />
  </div>
);

// Database Router
export const DBMain = () => (
  <div>
    <Route exact path="/database" component={Analysis} />
    <Route path="/database/cabinet" component={Analysis} />
    <Route path="/database/apply" component={Analysis} />
    <Route path="/database/malfunctionMatter" component={Analysis} />
    <Route path="/database/processingResult" component={Analysis} />
    <Route path="/database/sweep" component={Analysis} />
    <Route path="/database/crud" component={CRUD} />
    <Route path="/database/csv" component={CSV} />
    <Route path="/database/control" component={Control} />
  </div>
);

// Database Router
export const AnalysisMain = () => (
  <div>
    <Route exact path="/database" component={Repair} />
    <Route path="/database/cabinet" component={Cabinet} />
    <Route path="/database/apply" component={Apply} />
    <Route path="/database/malfunctionMatter" component={MalfunctionMatter} />
    <Route path="/database/processingResult" component={ProcessingResult} />
    <Route path="/database/sweep" component={Sweep} />
  </div>
);

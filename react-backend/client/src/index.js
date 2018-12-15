import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import { Error } from "./views/Error";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/database" component={App} />
      <Route exact path="/products" component={App} />
      <Route exact path="/login" component={App} />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();

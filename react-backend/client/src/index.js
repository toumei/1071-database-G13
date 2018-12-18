import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// service
import { unregister } from "./serviceWorker";

// router
import App from "./views/App";
import { Error } from "./Error";

// css
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/database/ctrl" component={App} />
      <Route exact path="/database/analysis" component={App} />
      <Route exact path="/database/csv" component={App} />
      <Route exact path="/malfunction" component={App} />
      <Route exact path="/processing" component={App} />
      <Route exact path="/products" component={App} />
      <Route exact path="/profile" component={App} />
      <Route exact path="/Settings" component={App} />
      <Route exact path="/login" component={App} />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

unregister();

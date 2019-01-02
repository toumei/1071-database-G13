import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TableList from "./containers/TableList";
import TableAdd from "./containers/TableAdd";
import TableEdit from "./containers/TableEdit";
import Test from "./containers/Test";
import Error from "./containers/Error";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TableList} />
      <Route exact path="/test" component={Test} />>
      <Route exact path="/:table" component={TableList} />
      <Route path="/:table/add" component={TableAdd} />
      <Route path="/:table/edit" component={TableEdit} />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

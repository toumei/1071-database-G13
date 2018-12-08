import React, { Component } from "react";
import Navbar from "./partials/Navbar";
import Header from "./partials/Header";
import DBCtrl from "./pages/DBCtrl";
import Products from "./pages/Products";
import Login from "./pages/Login";
import { Switch, Route } from "react-router-dom";

const index = () => <div />;

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={index} />
      <Route path="/dbCtrl" component={DBCtrl} />
      <Route path="/products" component={Products} />
      <Route path="/login" component={Login} />
    </Switch>
  </main>
);

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;

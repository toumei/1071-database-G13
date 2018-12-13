import React, { Component } from "react";
import { Navbar } from "./partials/Navbar";
import { Header } from "./partials/Header";
import { DB } from "./pages/DB";
import Products from "./pages/Products";
import { Login } from "./pages/Login";
import { Switch, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";

const index = () => <div />;

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={index} />
      <Route path="/database" component={DB} />
      <Route path="/products" component={Products} />
      <Route path="/login" component={Login} />
    </Switch>
  </main>
);

export default class App extends Component {
  constructor() {
    super();

    this.state = { endpoint: "http://localhost:3000" };
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("change color", "red");
  };

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("change color", color => {
      document.body.style.backgroundColor = color;
    });

    return (
      <div>
        <Navbar />
        <Header />
        <Main />
      </div>
    );
  }
}

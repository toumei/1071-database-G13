import React, { Component } from "react";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { DB } from "./database/DB";
import Products from "./products/Products";
import { Login } from "./login/Login";
import { Route } from "react-router-dom";
import socketIOClient from "socket.io-client";

const index = () => <div />;

const Main = () => (
  <main>
    <Route path="/" component={index} />
    <Route path="/database" component={DB} />
    <Route path="/products" component={Products} />
    <Route path="/login" component={Login} />
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

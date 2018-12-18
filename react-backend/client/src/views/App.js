import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Route, Link } from "react-router-dom";

// router import
import DB from "./database/DB";
import { Login } from "./login/Login";
import Products from "./products/Products";

// default program
export default class extends Component {
  constructor() {
    super();

    this.state = { endpoint: "http://localhost:3000" };
  }

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("change color", color => {
      document.body.style.backgroundColor = color;
    });

    return (
      <div>
        <Navbar />
        <Header />
        <Router />
      </div>
    );
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("change color", "red");
  };
}

// navbar
const Navbar = () => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        首頁
      </Link>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <NavItem />
    </div>
  </nav>
);

const NavItem = () => (
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/database/ctrl">
          資料庫
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/malfunction">
          報修單
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/processing">
          維修單
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/products">
          products
        </Link>
      </li>
    </ul>

    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          to="/user"
        >
          <i className="fas fa-user" /> Welcome Brad
        </Link>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/profile">
            <i className="fas fa-user-circle" /> Profile
          </Link>
          <Link className="dropdown-item" to="/settings">
            <i className="fas fa-cog" /> Settings
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fas fa-user-times" /> Logout
        </Link>
      </li>
    </ul>
  </div>
);

// header
const Header = () => (
  <header className="bg-primary text-light ">
    <div className="container">
      <div className="row">
        <h1 className="col-md-6">
          <i className="fas fa-cog" />
          title
        </h1>
      </div>
    </div>
  </header>
);

// router
const Router = () => (
  <div>
    <Route exact path="/" component={index} />
    <Route path="/database" component={DB} />
    <Route path="/products" component={Products} />
    <Route path="/malfunction" component={malfunction} />
    <Route path="/processing" component={processing} />
    <Route path="/profile" component={profile} />
    <Route path="/Settings" component={Settings} />
    <Route path="/login" component={Login} />
  </div>
);

// index
const index = () => <div>main</div>;

// malfunction
const malfunction = () => <div>malfunction</div>;

// processing
const processing = () => <div>processing</div>;

// profile
const profile = () => <div>profile</div>;

// Settings
const Settings = () => <div>Settings</div>;

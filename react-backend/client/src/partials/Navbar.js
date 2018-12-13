import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
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
  </div>
);

const NavItem = () => (
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/database">
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

export const Navbar = () => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <div className="container">
      <Home />
      <NavItem />
    </div>
  </nav>
);

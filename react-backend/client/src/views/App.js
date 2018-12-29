import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { Main } from "../router";

import logo from "../logo.svg";
import { CustomLink } from "../models/bootstrap.model";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  componentDidMount() {
    this.setState({ title: document.title });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== document.title) {
      this.setState({ title: document.title });
    }
  }

  render() {
    return (
      <div>
        <Navbar title={this.state.title} />
        <Header title={this.state.title} />
        <Main />
      </div>
    );
  }
}

const Navbar = ({ title }) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <div className="container">
      <Link
        className="navbar-brand"
        style={{ margin: "-0.5em" }}
        to="/"
        onClick={() => {
          const navbarBtn = document.getElementById("navbarBtn");
          if (navbarBtn.getAttribute("class") === "navbar-toggler")
            navbarBtn.click();
        }}
      >
        <img src={logo} width="55em" height="55em" alt={"logo"} />
      </Link>
      <h1 className="navbar-toggler">{title}</h1>
      <button
        id="navbarBtn"
        className="navbar-toggler collapsed"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <NavItem title={title} />
    </div>
  </nav>
);

const NavItem = ({ title }) => (
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <CustomLink
          title={title}
          titleOption="ResNetCMMS"
          to="/"
          content="首頁"
        />
      </li>
      <li className="nav-item">
        <CustomLink title={title} to="/database" content="資料庫" />
      </li>
      <li className="nav-item">
        <CustomLink title={title} to="/repair/malfunction" content="報修單" />
      </li>
      <li className="nav-item">
        <CustomLink title={title} to="/repair/processing" content="維修單" />
      </li>
      <li className="nav-item">
        <CustomLink title={title} to="/products" content="產品" />
      </li>
    </ul>

    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <Link
          className={
            "nav-link dropdown-toggle " +
            (document.title === "個人資料" || document.title === "設定"
              ? "active"
              : "")
          }
          data-toggle="dropdown"
          to="/user"
        >
          <i className="fas fa-user" /> 歡迎 Brad
        </Link>
        <div className="dropdown-menu" style={{ borderRadius: "1em" }}>
          <Link
            className="dropdown-item"
            style={{ borderRadius: "0.5em" }}
            to="/user/profile"
            onClick={() => {
              const navbarBtn = document.getElementById("navbarBtn");
              if (navbarBtn.getAttribute("class") === "navbar-toggler")
                navbarBtn.click();
            }}
          >
            <i className="fas fa-user-circle" /> 個人資料
          </Link>
          <Link
            className="dropdown-item"
            style={{ borderRadius: "0.5em" }}
            to="/user/settings"
            onClick={() => {
              const navbarBtn = document.getElementById("navbarBtn");
              if (navbarBtn.getAttribute("class") === "navbar-toggler")
                navbarBtn.click();
            }}
          >
            <i className="fas fa-cog" /> 設定
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <CustomLink
          title={title}
          titleOption="登入"
          to="/user/login"
          content={<i className="fas fa-user-times">登出</i>}
        />
      </li>
    </ul>
  </div>
);

const Header = ({ title }) => (
  <header className="bg-primary text-light ">
    <div className="container">
      <div className="row">
        <h1 className="col-md-6">
          <i className="fas fa-cog" />
          {title}
        </h1>
      </div>
    </div>
  </header>
);

import React, { PureComponent } from "react";

import { Main } from "../router";

import logo from "../logo.svg";
import {
  CustomActiveClickLink,
  CustomActiveDropdownClickLink,
  CustomClickLink
} from "../models/custom.model";

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
      <CustomClickLink
        className="navbar-brand"
        style={{ margin: "-0.5em" }}
        to="/"
        content={<img src={logo} width="55em" height="55em" alt={"logo"} />}
      />
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
        <CustomActiveClickLink
          active={title}
          activeOptions={["ResNetCMMS"]}
          to="/"
          content={<i className="fas"> 首頁</i>}
        />
      </li>
      <li className="nav-item">
        <CustomActiveClickLink
          active={title}
          activeOptions={["資料庫"]}
          to="/database"
          content={<i className="fas"> 資料庫</i>}
        />
      </li>
      <li className="nav-item">
        <CustomActiveClickLink
          active={title}
          activeOptions={["報修單"]}
          to="/repair/malfunction"
          content={<i className="fas"> 報修單</i>}
        />
      </li>
      <li className="nav-item">
        <CustomActiveClickLink
          active={title}
          activeOptions={["維修單"]}
          to="/repair/processing"
          content={<i className="fas"> 維修單</i>}
        />
      </li>
      <li className="nav-item">
        <CustomActiveClickLink
          active={title}
          activeOptions={["產品"]}
          to="/products"
          content={<i className="fas"> 產品</i>}
        />
      </li>
    </ul>

    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <CustomActiveDropdownClickLink
          active={title}
          activeOptions={["個人資料", "設定"]}
          to="/user"
          dataToggle="dropdown"
          content={<i className="fas fa-user"> 歡迎 Brad</i>}
        />
        <div className="dropdown-menu" style={{ borderRadius: "1em" }}>
          <CustomClickLink
            className="dropdown-item"
            style={{ borderRadius: "0.5em" }}
            to="/user/profile"
            content={<i className="fas fa-user-circle"> 個人資料</i>}
          />
          <CustomClickLink
            className="dropdown-item"
            style={{ borderRadius: "0.5em" }}
            to="/user/settings"
            content={<i className="fas fa-cog"> 設定</i>}
          />
        </div>
      </li>
      <li className="nav-item">
        <CustomActiveClickLink
          active={title}
          activeOptions={["登入", "登出"]}
          to="/user/login"
          content={<i className="fas fa-user-times"> 登出</i>}
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

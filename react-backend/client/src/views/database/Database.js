import React, { Component } from "react";
import { Link } from "react-router-dom";

import { DBMain } from "../../router";

// default program
export default class extends Component {
  render() {
    return (
      <div>
        <DBNavbar path={this.props.location.pathname} />
        <DBMain />
      </div>
    );
  }
}

// navbar
const DBNavbar = ({ path }) => (
  <section className="bg-light">
    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item">
        <Link
          className={"nav-link " + (path === "/database" ? "active" : "")}
          to="/database"
        >
          分析表
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={
            "nav-link " + (path === "/database/control" ? "active" : "")
          }
          to="/database/control"
        >
          表格編輯
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={"nav-link " + (path === "/database/csv" ? "active" : "")}
          to="/database/csv"
        >
          匯出csv
        </Link>
      </li>
    </ul>
  </section>
);

import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { DBMain } from "../../router";

import { CustomLink } from "../../models/bootstrap.model";

// default program
export default class extends PureComponent {
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
          className={
            "nav-link " +
            (path === "/database" ||
            path === "/database/cabinet" ||
            path === "/database/vendor" ||
            path === "/database/boarder" ||
            path === "/database/employee" ||
            path === "/database/sweep"
              ? "active show"
              : "")
          }
          to="/database"
          onClick={() => {
            const navbarBtn = document.getElementById("navbarBtn");
            if (navbarBtn.getAttribute("class") === "navbar-toggler")
              navbarBtn.click();
          }}
        >
          分析表
        </Link>
      </li>
      <li className="nav-item">
        <CustomLink path={path} to="/database/crud" content="表格編輯" />
      </li>
      <li className="nav-item">
        <CustomLink path={path} to="/database/csv" content="匯出csv" />
      </li>
      <li className="nav-item">
        <CustomLink path={path} to="/database/control" content="欄位控制" />
      </li>
    </ul>
  </section>
);

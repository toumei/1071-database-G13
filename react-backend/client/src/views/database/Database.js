import React, { Component } from "react";

import { DBMain } from "../../router";

import { CustomLink } from "../../models/bootstrap.model";

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
        <CustomLink path={path} to="/database" content="分析表" />
      </li>
      <li className="nav-item">
        <CustomLink path={path} to="/database/control" content="表格編輯" />
      </li>
      <li className="nav-item">
        <CustomLink path={path} to="/database/csv" content="匯出csv" />
      </li>
    </ul>
  </section>
);

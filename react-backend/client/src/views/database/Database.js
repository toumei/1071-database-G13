import React, { Component } from "react";
import { Link } from "react-router-dom";

import { DBMain } from "../../router";

// default program
export default class extends Component {
  render() {
    return (
      <div>
        <DBNavbar />
        <DBMain />
      </div>
    );
  }
}

// navbar
const DBNavbar = () => (
  <section className="bg-light">
    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item">
        <Link className="nav-link" to="/database/analysis">
          分析表
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/database/control">
          表格編輯
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/database/csv">
          匯出csv
        </Link>
      </li>
    </ul>
  </section>
);
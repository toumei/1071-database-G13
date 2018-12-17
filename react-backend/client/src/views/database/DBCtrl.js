import React, { Component } from "react";
import { Link } from "react-router-dom";

import DBTable from "./DBTable";
import DBDatabase from "./DBDatabase";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { table: "boarder" };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <DBDatabase
              table={this.state.table}
              handleChangeTable={table => this.handleChangeTable(table)}
            />
            <DBTable table={this.state.table} />
          </div>
        </div>
      </div>
    );
  }

  // handle
  handleChangeTable(table) {
    this.setState({ table: table });
  }
}

// navbar
const Navbar = () => (
  <section className="bg-light">
    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item">
        <Link className="nav-link" to="/analysis">
          分析表
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/database">
          表格編輯
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="">
          匯出csv
        </Link>
      </li>
    </ul>
  </section>
);

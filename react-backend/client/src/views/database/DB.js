import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import DBTable from "./ctrl/DBTable";
import DBDatabase from "./ctrl/DBDatabase";

// default program
export default class extends Component {
  render() {
    return (
      <div>
        <DBnavbar />
        <Router />
      </div>
    );
  }
}

const Router = () => (
  <div>
    <Route exact path="/database/ctrl" component={DBCtrl} />
    <Route path="/database/analysis" component={analysis} />
    <Route path="/database/csv" component={csv} />
  </div>
);

const analysis = () => <div>analysis</div>;

const csv = () => <div>csv</div>;

class DBCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = { table: "boarder" };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <DBDatabase
            table={this.state.table}
            handleChangeTable={table => this.handleChangeTable(table)}
          />
          <DBTable table={this.state.table} />
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
const DBnavbar = () => (
  <section className="bg-light">
    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item">
        <Link className="nav-link" to="/database/analysis">
          分析表
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/database/ctrl">
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

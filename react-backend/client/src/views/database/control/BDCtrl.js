import React, { Component } from "react";

import DBTable from "./DBTable";
import DBDatabase from "./DBDatabase";

import { handleChangeTable } from "../../../controllers/DBCtrl.controller";

export default class extends Component {
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
            handleChangeTable={table => handleChangeTable(this, table)}
          />
          <DBTable table={this.state.table} />
        </div>
      </div>
    );
  }
}

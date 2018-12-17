import React, { Component } from "react";
import DBDatabase from "./DBDatabase";
import DBTable from "./DBTable";

export default class DBCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = { table: "boarder" };
  }

  render() {
    return this.ctrl();
  }

  handleChangeTable(table) {
    this.setState({ table: table });
  }

  ctrl() {
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
}

import React, { Component } from "react";
import DBDatabase from "./DBDatabase";
import DBTable from "./DBTable";

export default class DBCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = { table: "boarder" };
  }

  handleAdd(table) {
    this.setState({ table: table });
  }

  ctrl() {
    return (
      <div className="container-fluid">
        <div className="row">
          <DBDatabase
            table={this.state.table}
            handleAdd={table => this.handleAdd(table)}
          />
          <DBTable table={this.state.table} />
        </div>
      </div>
    );
  }

  render() {
    return this.ctrl();
  }
}

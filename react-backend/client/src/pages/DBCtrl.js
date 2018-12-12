import React, { Component } from "react";
import DBDatabase from "./DBDatabase";
import DBTable from "./DBTable";

class DBCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = { table: "boarder" };
  }

  handleAdd(table) {
    this.setState({ table: table });
  }

  render() {
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
}

export default DBCtrl;

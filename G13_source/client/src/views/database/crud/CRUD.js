import React, { Component } from "react";

// view
import CrudTable from "./CRUD.Table";
import CrudTableMenu from "./CRUD.TableMenu";

// controller
import { handleChangeTable } from "../../../controllers/CRUD.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { table: "apply" };
    document.title = "資料庫";
  }

  render() {
    return (
      <div className="container-fluid main-opacity">
        <div className="row">
          <CrudTableMenu
            table={this.state.table}
            handleChangeTable={table => handleChangeTable(this, table)}
          />
          <CrudTable table={this.state.table} />
        </div>
      </div>
    );
  }
}

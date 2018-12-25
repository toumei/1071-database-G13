import React, { PureComponent } from "react";

// view
import CrudTableMenu from "./CRUD.TableMenu";
import CrudTable from "./CRUD.Table";

// controller
import { handleChangeTable } from "../../../controllers/CRUD.controller";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { table: "boarder" };
    document.title = "資料庫";
  }

  render() {
    return (
      <div className="container-fluid">
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

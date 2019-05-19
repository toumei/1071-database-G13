import React, { Component } from "react";

// view
import CrudTable from "./CRUD.Table";
import CrudTableMenu from "./CRUD.TableMenu";

// controller
import { handleChangeTable } from "../../../controllers/CRUD.controller";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: "apply",
      left: false
    };
    document.title = "資料庫";
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
      <div className="height-full container-fluid opacity animation-one" style={{ backgroundColor: "white" }}>
        <div className="white"></div>
        <div className="row" style={{ marginTop: "10px" }}>
          <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer('left', false)}
            onOpen={this.toggleDrawer('left', true)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              <CrudTableMenu
                table={this.state.table}
                handleChangeTable={table => handleChangeTable(this, table)}
              />
            </div>
          </SwipeableDrawer>
          <CrudTable table={this.state.table} toggleDrawer={() => this.toggleDrawer("left", true)} />
        </div>
      </div>
    );
  }
}

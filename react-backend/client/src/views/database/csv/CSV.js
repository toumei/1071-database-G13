import React, { PureComponent } from "react";

import {
  postCSVTableColumns,
  postCSVTableData
} from "../../../controllers/axios.controller";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    };
    document.title = "資料庫";
  }

  componentDidMount() {
    postCSVTableColumns(this);
    postCSVTableData(this);
  }

  render() {
    if (this.state.columns.length > 0) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-11" style={{ marginTop: 10 }}>
              <CustomBootstrap
                base={{
                  keyField: "ID",
                  columns: this.state.columns,
                  data: this.state.data
                }}
                pagination={this.state.data.length === 0 ? false : true}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

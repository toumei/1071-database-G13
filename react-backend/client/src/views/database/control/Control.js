import React, { Component } from "react";

import {
  postCtrlTableColumns,
  postCtrlTableData
} from "../../../controllers/axios.controller";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    };
    document.title = "資料庫";
  }

  componentDidMount() {
    postCtrlTableColumns(this);
    postCtrlTableData(this);
  }

  render() {
    if (this.state.columns.length > 0) {
      return (
        <div class="container-fluid">
          <div class="row justify-content-md-center">
            <div className="col-md-10" style={{ marginTop: 10 }}>
              <CustomBootstrap
                base={{
                  keyField: "ID",
                  columns: this.state.columns,
                  data: this.state.data
                }}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

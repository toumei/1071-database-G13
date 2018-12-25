import React, { PureComponent } from "react";
import cellEditFactory from "react-bootstrap-table2-editor";

import {
  postCtrlTableColumns,
  postCtrlTableData,
  postCtrlEdit
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
    postCtrlTableColumns(this);
    postCtrlTableData(this);
  }

  render() {
    if (this.state.columns.length > 0) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-10" style={{ marginTop: 10 }}>
              <CustomBootstrap
                base={{
                  keyField: "ID",
                  columns: this.state.columns,
                  data: this.state.data
                }}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                  afterSaveCell: (oldValue, newValue, row, column) => {
                    if (String(oldValue) !== String(newValue))
                      postCtrlEdit(row);
                  }
                })}
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

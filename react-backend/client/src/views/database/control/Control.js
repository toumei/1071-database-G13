import React, { PureComponent } from "react";

// bootstrap
import cellEditFactory from "react-bootstrap-table2-editor";

// controller
import {
  postCtrlEdit,
  postCtrlTableData,
  postCtrlTableColumns
} from "../../../controllers/Control.controller";

// model
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
        <div className="row justify-content-center">
          <div className="col-md-11">
            <CustomBootstrap
              base={{
                keyField: "ID",
                columns: this.state.columns,
                data: this.state.data
              }}
              cellEdit={cellEditFactory({
                mode: "click",
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row) => {
                  if (String(oldValue) !== String(newValue)) {
                    if (newValue === row.type) {
                      if (row.type === "SELECT") {
                        row.value = JSON.stringify([]);
                      } else if (row.type === "CHECKBOX") {
                        row.value = ":";
                      } else {
                        row.value = "NONE";
                      }
                      postCtrlEdit(row);
                    }
                  }
                }
              })}
              pagination={this.state.data.length === 0 ? false : true}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

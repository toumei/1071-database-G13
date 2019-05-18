import React, { Component } from "react";

// bootstrap
import cellEditFactory from "react-bootstrap-table2-editor";

// model
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

// controller
import {
  postCtrlData,
  postCtrlEdit,
  postCtrlColumns
} from "../../../controllers/Ctrl.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    };
    document.title = "資料庫";
  }

  // 載入欄位與資料
  componentDidMount() {
    postCtrlColumns(this);
    postCtrlData(this);
  }

  render() {
    // 空欄位時，bootstrap table會讀取失敗
    if (this.state.columns.length > 0) {
      return (
        <div className="container-fluid opacity animation-one" style={{ backgroundColor: "white" }}>
          <div className="row justify-content-center" style={{ marginTop: "10px" }}>
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
                    // 預防非字串與字串內容相等卻更新
                    if (String(oldValue) !== String(newValue)) {
                      // 當type變更時，value將會被預設
                      if (newValue === row.type) {
                        if (row.type === "SELECT") {
                          row.value = JSON.stringify([]);
                        } else if (row.type === "CHECKBOX") {
                          row.value = ":";
                        } else {
                          row.value = "NONE";
                        }
                      }
                      postCtrlEdit(this, row);
                    }
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

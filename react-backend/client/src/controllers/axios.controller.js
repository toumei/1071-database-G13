import React from "react";
import axios from "axios";
import Crypt from "../models/crypt.model";

export default function() {}

export function getTableList(db) {
  axios.post("dbCtrl/TableList").then(response => {
    const decryptedJSON = Crypt.decrypt(response.data);
    let data = [];
    decryptedJSON.forEach(element => {
      data.push({
        TABLE_COMMENT: element["TABLE_COMMENT"],
        TABLE_NAME: element["TABLE_NAME"],
        align: "center"
      });
    });
    db.setState({
      data: data
    });
  });
}

export function getColumnList(db) {
  axios.post("dbCtrl/ColumnList?table=" + db.state.table).then(response => {
    let columns = [];
    Crypt.decrypt(response.data).forEach(element => {
      columns.push({
        dataField: element["COLUMN_NAME"],
        text: element["COLUMN_COMMENT"],
        sort: true,
        headerAlign: "center",
        align: "center",
        headerStyle: {
          cursor: "pointer",
          width: element["COLUMN_NAME"] === "ID" ? "" : "100em"
        }
      });
    });
    columns.push({
      dataField: "action",
      isDummyField: true,
      text: "操作",
      formatter: (cell, row) => {
        return (
          <div className="btn-group">
            <button
              type="button"
              name="view"
              className="btn btn-warning btn-sm"
            >
              查看
            </button>
            <button
              type="button"
              name="edit"
              className="btn btn-warning btn-sm"
            >
              編輯
            </button>
            <button
              type="button"
              name="delete"
              className="btn btn-warning btn-sm"
              onClick={e => db.delete(row)}
            >
              刪除
            </button>
          </div>
        );
      },
      headerAlign: "center",
      align: "center",
      editable: false
    });
    db.setState({
      columns: columns
    });
  });
}

export function getList(db) {
  axios.post("dbCtrl/List?table=" + db.state.table).then(response => {
    db.setState({
      data: Crypt.decrypt(response.data)
    });
  });
}

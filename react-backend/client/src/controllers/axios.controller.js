import React from "react";
import axios from "axios";
import { decrypt } from "../models/crypt.model";

export function getTableList(db) {
  axios.post("http://localhost:3000/dbCtrl/TableList").then(response => {
    const decryptedJSON = decrypt(response.data);
    let data = [];
    decryptedJSON.forEach(element => {
      data.push({
        TABLE_COMMENT: element["TABLE_COMMENT"],
        TABLE_NAME: element["TABLE_NAME"],
        align: "center"
      });
    });
    db.setState({ data: data });
  });
}

export function getColumnList(db) {
  axios
    .post("http://localhost:3000/dbCtrl/ColumnList?table=" + db.state.table)
    .then(response => {
      let columns = [];
      decrypt(response.data).forEach(element => {
        columns.push({
          dataField: element["COLUMN_NAME"],
          text: element["COLUMN_COMMENT"],
          sort: true,
          sortCaret: (order, column) => {
            if (!order) return <span>&nbsp;&nbsp;↑↓</span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;
                  <font color="red">↑</font>↓
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;↑
                  <font color="red">↓</font>
                </span>
              );
            return null;
          },
          headerAlign: "center",
          align: "center",
          headerStyle: {
            cursor: "pointer",
            width: element["COLUMN_NAME"] === "ID" ? "" : "100rem",
            minWidth: element["COLUMN_NAME"] === "ID" ? "" : "10rem"
          },
          style: { cursor: "default" }
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
                name="delete"
                className="btn btn-warning btn-sm"
              >
                查看
              </button>
              <button
                type="button"
                name="delete"
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
        editable: false,
        headerStyle: {
          cursor: "default",
          minWidth: "5rem"
        }
      });
      db.setState({
        columns: columns
      });
    });
}

export function getList(db) {
  axios
    .post("http://localhost:3000/dbCtrl/List?table=" + db.state.table)
    .then(response => {
      db.setState({
        data: decrypt(response.data)
      });
    });
}

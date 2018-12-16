import React from "react";

export const databaseColumns = db => [
  {
    dataField: "TABLE_COMMENT",
    text: "資料庫",
    headerAlign: "center",
    align: "center",
    style: (cell, row, rowIndex, colIndex) => {
      if (row.TABLE_NAME === db.state.selected) {
        return { cursor: "pointer", backgroundColor: "#81c784" };
      }
      return { cursor: "pointer", backgroundColor: "white" };
    }
  }
];

export const navColumns1 = element => [
  {
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
    }
  }
];

export const navColumns2 = db => [
  {
    dataField: "action",
    isDummyField: true,
    text: "操作",
    formatter: (cell, row) => {
      return (
        <div className="btn-group">
          <button
            type="button"
            name="revert"
            className="btn btn-warning btn-sm"
            onClick={e => db.revert(row)}
          >
            還原
          </button>
        </div>
      );
    },
    headerAlign: "center",
    align: "center",
    editable: false,
    headerStyle: {
      minWidth: "5rem"
    }
  }
];

export const tableColumns1 = element => [
  {
    TABLE_COMMENT: element["TABLE_COMMENT"],
    TABLE_NAME: element["TABLE_NAME"],
    align: "center"
  }
];

export const tableColumns2 = element => [
  {
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
  }
];

export const tableColumns3 = db => [
  {
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
            data-toggle="modal"
            data-target={"#delete1Modal"}
            onClick={e => db.handleRow(row)}
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
  }
];

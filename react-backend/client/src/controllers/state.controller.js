import React from "react";
import { stateColumns, stateHS } from "../models/state.model";

export const databaseColumns = bind => [
  {
    ...stateColumns("TABLE_COMMENT", "資料庫")[0],
    style: (cell, row, rowIndex, colIndex) => {
      if (row.TABLE_NAME === bind.state.selected) {
        return { cursor: "pointer", backgroundColor: "#81c784" };
      }
      return { cursor: "pointer", backgroundColor: "white" };
    }
  }
];

export const navColumns1 = element => [
  {
    ...stateColumns(element["COLUMN_NAME"], element["COLUMN_COMMENT"], true)[0],
    headerStyle: { cursor: "pointer", ...stateHS(element)[0] }
  }
];

export const navColumns2 = bind => [
  {
    ...stateColumns("action", "操作")[0],
    isDummyField: true,
    formatter: (cell, row) => {
      return (
        <div className="btn-group">
          <button
            type="button"
            name="revert"
            className="btn btn-warning btn-sm"
            onClick={e => bind.revert(row)}
          >
            還原
          </button>
        </div>
      );
    },
    editable: false,
    headerStyle: { minWidth: "5rem" }
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
    ...stateColumns(element["COLUMN_NAME"], element["COLUMN_COMMENT"], true)[0],
    headerStyle: { cursor: "pointer", ...stateHS(element)[0] },
    style: { cursor: "default" }
  }
];

export const tableColumns3 = bind => [
  {
    ...stateColumns("action", "操作")[0],
    isDummyField: true,
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
            onClick={e => bind.handleRow(row)}
          >
            刪除
          </button>
        </div>
      );
    },
    editable: false,
    headerStyle: { cursor: "default", minWidth: "5rem" }
  }
];

export const tableColumns4 = element => [
  {
    ...stateColumns(element["COLUMN_NAME"], element["COLUMN_COMMENT"])[0],
    headerStyle: stateHS(element)[0],
    style: { cursor: "default" }
  }
];

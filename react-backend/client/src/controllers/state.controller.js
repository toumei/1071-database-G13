import React from "react";

// model
import { customColumnM, columnWidthM } from "../models/state.model";

export const DatabaseColumnsC = bind => [
  {
    ...customColumnM("TABLE_COMMENT", "資料庫")[0],
    style: (cell, row, rowIndex, colIndex) => {
      if (row.TABLE_NAME === bind.state.table) {
        return { cursor: "pointer", backgroundColor: "#81c784" };
      }
      return { cursor: "pointer", backgroundColor: "white" };
    }
  }
];

export const TableNavColumnsC = element => [
  {
    ...customColumnM(
      element["COLUMN_NAME"],
      element["COLUMN_COMMENT"],
      true
    )[0],
    headerStyle: { cursor: "pointer", ...columnWidthM(element)[0] }
  }
];

export const TableNavModeColumnsC = bind => [
  {
    ...customColumnM("action", "操作")[0],
    isDummyField: true,
    formatter: (cell, row) => {
      return (
        <div className="btn-group">
          <button
            type="button"
            name="cancel"
            className="btn btn-warning btn-sm"
            onClick={e => bind.cancelDelete(row)}
          >
            取消
          </button>
        </div>
      );
    },
    editable: false,
    headerStyle: { minWidth: "5rem" }
  }
];

export const TableDataC = element => [
  {
    TABLE_COMMENT: element["TABLE_COMMENT"],
    TABLE_NAME: element["TABLE_NAME"],
    align: "center"
  }
];

export const TableColumnsC = element => [
  {
    ...customColumnM(
      element["COLUMN_NAME"],
      element["COLUMN_COMMENT"],
      true
    )[0],
    headerStyle: { cursor: "pointer", ...columnWidthM(element)[0] },
    style: { cursor: "default" }
  }
];

export const TableModeColumnsC = bind => [
  {
    ...customColumnM("action", "操作")[0],
    isDummyField: true,
    formatter: (cell, row) => {
      return (
        <div className="btn-group">
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
            data-target={"#deleteModal"}
            onClick={e => bind.handleDeleteListener(row)}
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

export const TableDeleteColumnsC = element => [
  {
    ...customColumnM(element["COLUMN_NAME"], element["COLUMN_COMMENT"])[0],
    headerStyle: columnWidthM(element)[0],
    style: { cursor: "default" }
  }
];

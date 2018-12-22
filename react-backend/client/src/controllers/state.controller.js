import React from "react";

import { Type } from "react-bootstrap-table2-editor";

// model
import { customColumnM, columnWidthM } from "../models/state.model";

export const DatabaseColumnsC = bindDatabase => [
  {
    ...customColumnM("TABLE_COMMENT", "資料庫")[0],
    style: (cell, row, rowIndex, colIndex) => {
      if (row.TABLE_NAME === bindDatabase.state.table) {
        return { cursor: "pointer", backgroundColor: "#81c784" };
      }
      return { cursor: "pointer", backgroundColor: "white" };
    }
  }
];

export const TableNavColumnsC = elm => [
  {
    ...customColumnM(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    headerStyle: { cursor: "pointer", ...columnWidthM(elm)[0] }
  }
];

export const TableNavModeColumnsC = bindTableNav => [
  {
    ...customColumnM("action", "操作")[0],
    isDummyField: true,
    formatter: (cell, row) => (
      <div className="btn-group">
        <button
          type="button"
          name="cancel"
          className="btn btn-warning btn-sm"
          onClick={e => bindTableNav.cancelDelete(row)}
        >
          取消
        </button>
      </div>
    ),
    editable: false,
    headerStyle: { minWidth: "5rem" }
  }
];

export const TableDataC = elm => [
  {
    TABLE_COMMENT: elm["TABLE_COMMENT"],
    TABLE_NAME: elm["TABLE_NAME"],
    align: "center"
  }
];

export const TableColumnsC = (bindTable, elm) => [
  {
    ...customColumnM(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    editable: bindTable.state.editable,
    headerStyle: { cursor: "pointer", ...columnWidthM(elm)[0] },
    style: { cursor: "default" },
    editor: { type: Type.TEXT }
  }
];

export const TableModeColumnsC = bindTable => [
  {
    ...customColumnM("action", "操作")[0],
    isDummyField: true,
    formatter: (cell, row) => (
      <div className="btn-group">
        <button
          type="button"
          name="delete"
          className="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target={"#editModal"}
          onClick={e => bindTable.getItem(row)}
        >
          編輯
        </button>
        <button
          type="button"
          name="delete"
          className="btn btn-danger btn-sm"
          data-toggle="modal"
          data-target={"#deleteModal"}
          onClick={e => bindTable.getItem(row)}
        >
          刪除
        </button>
      </div>
    ),
    editable: false,
    headerStyle: { cursor: "default", minWidth: "5rem" }
  }
];

export const TableDeleteColumnsC = elm => [
  {
    ...customColumnM(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"])[0],
    headerStyle: columnWidthM(elm)[0],
    style: { cursor: "default" }
  }
];

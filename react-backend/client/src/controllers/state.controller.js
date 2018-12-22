import React from "react";

import { Type } from "react-bootstrap-table2-editor";

// model
import { customColumn, columnWidth } from "../models/state.model";

import { getItem } from "./DBTable.controller";
import { cancelDelete } from "./DBTableNav.controller";

export const DatabaseColumns = bindDatabase => [
  {
    ...customColumn("TABLE_COMMENT", "資料庫")[0],
    style: (cell, row, rowIndex, colIndex) => {
      if (row.TABLE_NAME === bindDatabase.state.table) {
        return { cursor: "pointer", backgroundColor: "#81c784" };
      }
      return { cursor: "pointer", backgroundColor: "white" };
    }
  }
];

export const TableNavColumns = elm => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] }
  }
];

export const TableNavModeColumns = bindTableNav => [
  {
    ...customColumn("action", "操作")[0],
    isDummyField: true,
    formatter: (cell, row) => (
      <div className="btn-group">
        <button
          type="button"
          name="cancel"
          className="btn btn-warning btn-sm"
          onClick={e => cancelDelete(bindTableNav, row)}
        >
          取消
        </button>
      </div>
    ),
    editable: false,
    headerStyle: { minWidth: "5rem" }
  }
];

export const TableData = elm => [
  {
    TABLE_COMMENT: elm["TABLE_COMMENT"],
    TABLE_NAME: elm["TABLE_NAME"],
    align: "center"
  }
];

export const TableColumns = (bindTable, elm) => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    editable: bindTable.state.editable,
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" },
    editor: { type: Type.TEXT }
  }
];

export const TableModeColumns = bindTable => [
  {
    ...customColumn("action", "操作")[0],
    isDummyField: true,
    formatter: (cell, row) => (
      <div className="btn-group">
        <button
          type="button"
          name="delete"
          className="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target={"#editModal"}
          onClick={e => getItem(bindTable, row)}
        >
          編輯
        </button>
        <button
          type="button"
          name="delete"
          className="btn btn-danger btn-sm"
          data-toggle="modal"
          data-target={"#deleteModal"}
          onClick={e => getItem(bindTable, row)}
        >
          刪除
        </button>
      </div>
    ),
    editable: false,
    headerStyle: { cursor: "default", minWidth: "5rem" }
  }
];

export const TableDeleteColumns = elm => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"])[0],
    headerStyle: columnWidth(elm)[0],
    style: { cursor: "default" }
  }
];

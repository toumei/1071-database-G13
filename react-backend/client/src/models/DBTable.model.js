import React from "react";

import { Type } from "react-bootstrap-table2-editor";

import { customColumn, columnWidth } from "./state.model";

import { getItem } from "../controllers/DBTable.controller";

const type = {
  1: Type.TEXT,
  2: Type.SELECT,
  3: Type.TEXTAREA,
  4: Type.CHECKBOX,
  5: Type.DATE
};

export const TableColumns = (bindTable, elm) => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    editable: bindTable.state.editable,
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" },
    editor: {
      type: type[elm["type"]],
      value: elm["type"] === 4 ? elm["value"] : undefined,
      options: elm["type"] === 2 ? elm["value"] : undefined
    },
    editorRenderer:
      elm["type"] > 5
        ? (editorProps, value, row, column, rowIndex, columnIndex) => {
            const date = new Date();
            const today = `${date.getFullYear()}-${(
              "0" +
              (date.getMonth() + 1)
            ).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${(
              "0" + date.getHours()
            ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
              "0" + date.getSeconds()
            ).slice(-2)}`;
            return (
              <input
                className="form-control"
                type="datetime-local"
                id="datetime"
                defaultValue={today}
                autoFocus
              />
            );
          }
        : undefined
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

export const TableFormColumns = elm => [
  { COLUMN_NAME: elm["COLUMN_NAME"], COLUMN_COMMENT: elm["COLUMN_COMMENT"] }
];

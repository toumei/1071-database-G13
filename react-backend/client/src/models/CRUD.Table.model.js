import React, { Component } from "react";

import { Type } from "react-bootstrap-table2-editor";

import { customColumn, columnWidth } from "./state.model";

import { getItem } from "../controllers/CRUD.Table.controller";
class DateTime extends Component {
  getValue() {
    return this.node.value + ".000Z";
  }

  render() {
    const date = new Date();
    this.today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(
      -2
    )}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(
      -2
    )}`;
    const { value, ...rest } = this.props;
    return (
      <input
        {...rest}
        key="datetime-local"
        className="form-control"
        type="datetime-local"
        defaultValue={value === undefined ? this.today : value.split(".")[0]}
        ref={n => (this.node = n)}
        autoFocus
      />
    );
  }
}

const type = {
  TEXT: Type.TEXT,
  SELECT: Type.SELECT,
  TEXTAREA: Type.TEXTAREA,
  CHECKBOX: Type.CHECKBOX,
  DATE: Type.DATE,
  DATETIME: (editorProps, value, row, column, rowIndex, columnIndex) => (
    <DateTime {...editorProps} value={value} />
  )
};

export const CrudTableColumns = (bindTable, elm) => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    editable: bindTable.state.editable,
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" },
    editor: {
      type: elm["type"] !== "DATETIME" ? type[elm["type"]] : undefined,
      value: elm["type"] === "CHECKBOX" ? elm["value"] : undefined,
      options: elm["type"] === "SELECT" ? elm["value"] : undefined
    },
    editorRenderer: elm["type"] === "DATETIME" ? type[elm["type"]] : undefined
  }
];

export const CtrlTableColumns = (
  bindTable,
  elm,
  editable,
  editorType,
  editorValue
) => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    editable: editable,
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" },
    editor: {
      type: editorType !== "DATETIME" ? type[editorType] : undefined,
      value: editorType === "CHECKBOX" ? editorValue : undefined,
      options: editorType === "SELECT" ? editorValue : undefined
    }
  }
];

export const CrudTableModeColumns = bindTable => [
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
          onClick={() => getItem(bindTable, row)}
        >
          編輯
        </button>
        <button
          type="button"
          name="delete"
          className="btn btn-danger btn-sm"
          data-toggle="modal"
          data-target={"#deleteModal"}
          onClick={() => getItem(bindTable, row)}
        >
          刪除
        </button>
      </div>
    ),
    editable: false,
    headerStyle: { cursor: "default", minWidth: "5rem" }
  }
];

export const CrudTableDeleteColumns = elm => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"])[0],
    headerStyle: columnWidth(elm)[0],
    style: { cursor: "default" }
  }
];

export const CrudTableFormColumns = elm => [
  { COLUMN_NAME: elm["COLUMN_NAME"], COLUMN_COMMENT: elm["COLUMN_COMMENT"] }
];

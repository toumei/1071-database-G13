import React from "react";

import { customColumns, columnsWidth } from "./react-bootstrap.model";

import { cancelDelete } from "../controllers/CRUD.TableNav.controller";

export const TableNavColumns = (bind, props) => {
  let columns = [];
  const newColumns = props.columns;
  newColumns.forEach((elm, i) => {
    if (i !== newColumns.length) {
      columns.push({
        ...customColumns(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true),
        headerStyle: { cursor: "pointer", ...columnsWidth(elm) }
      });
    }
  });

  columns.push(TableNavModeColumns(bind));
  return columns;
};

export const TableNavModeColumns = bind => {
  return {
    ...customColumns("action", "操作"),
    isDummyField: true,
    formatter: (cell, row) => (
      <div className="btn-group">
        <button
          type="button"
          name="cancel"
          className="btn btn-warning btn-sm"
          onClick={() => cancelDelete(bind, row)}
        >
          取消
        </button>
      </div>
    ),
    editable: false,
    headerStyle: { minWidth: "5rem" }
  };
};

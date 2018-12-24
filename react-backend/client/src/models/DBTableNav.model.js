import React from "react";

import { customColumn, columnWidth } from "./state.model";

import { cancelDelete } from "../controllers/DBTableNav.controller";

export function TableNavColumns(bind, props) {
  let columns = [];
  const newColumns = props.columns;
  newColumns.forEach((elm, i) => {
    if (i !== newColumns.length) {
      columns.push({
        ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
        headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] }
      });
    }
  });

  columns.push(TableNavModeColumns(bind)[0]);
  return columns;
}

export const TableNavModeColumns = bind => [
  {
    ...customColumn("action", "操作")[0],
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
  }
];

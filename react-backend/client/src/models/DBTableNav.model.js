import React from "react";

import { customColumn, columnWidth } from "./state.model";

import { cancelDelete } from "../controllers/DBTableNav.controller";

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

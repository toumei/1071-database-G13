import { customColumn } from "./state.model";

export const TableMenuColumns = bind => [
  {
    ...customColumn("TABLE_COMMENT", "表格")[0],
    style: (cell, row, rowIndex, colIndex) => {
      if (row.TABLE_NAME === bind.state.table) {
        return { cursor: "pointer", backgroundColor: "#81c784" };
      }
      return { cursor: "pointer", backgroundColor: "white" };
    }
  }
];

export const TableMenuData = elm => [
  {
    TABLE_COMMENT: elm["TABLE_COMMENT"],
    TABLE_NAME: elm["TABLE_NAME"],
    align: "center"
  }
];
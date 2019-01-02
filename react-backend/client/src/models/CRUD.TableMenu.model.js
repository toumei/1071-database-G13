import { customColumns } from "./react-bootstrap.model";

export const CrudTableMenuColumns = bind => [
  {
    ...customColumns("TABLE_COMMENT", "表格"),
    style: (cell, row, rowIndex, colIndex) => {
      if (row.TABLE_NAME === bind.state.table) {
        return { cursor: "pointer", backgroundColor: "#81c784" };
      }
      return { cursor: "pointer", backgroundColor: "white" };
    }
  }
];

export const CrudTableMenuData = elm => {
  return {
    TABLE_COMMENT: elm["TABLE_COMMENT"],
    TABLE_NAME: elm["TABLE_NAME"],
    align: "center"
  };
};

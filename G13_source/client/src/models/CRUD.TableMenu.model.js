// model
import { customColumns } from "./react-bootstrap.model";

export const CrudTableMenuColumns = bind => [
  {
    ...customColumns("table_comment", "表格"),
    style: (cell, row, rowIndex, colIndex) => {
      if (row.table_name === bind.state.table) {
        return { cursor: "pointer", backgroundColor: "#81c784" };
      }
      return { cursor: "pointer", backgroundColor: "white" };
    }
  }
];

export const CrudTableMenuData = elm => {
  return {
    table_comment: elm["table_comment"],
    table_name: elm["table_name"],
    align: "center"
  };
};

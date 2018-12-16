import React from "react";

export const stateColumns = (data, text, sort = false) => [
  {
    dataField: data,
    text: text,
    align: "center",
    headerAlign: "center",
    sort: sort,
    sortCaret: (order, column) => {
      if (!order) return <span>&nbsp;&nbsp;↑↓</span>;
      else if (order === "asc")
        return (
          <span>
            &nbsp;&nbsp;
            <font color="red">↑</font>↓
          </span>
        );
      else if (order === "desc")
        return (
          <span>
            &nbsp;&nbsp;↑
            <font color="red">↓</font>
          </span>
        );
      return null;
    }
  }
];

export const stateHS = element => [
  {
    cursor: "pointer",
    width: element["COLUMN_NAME"] === "ID" ? "" : "100rem",
    minWidth: element["COLUMN_NAME"] === "ID" ? "" : "10rem"
  }
];

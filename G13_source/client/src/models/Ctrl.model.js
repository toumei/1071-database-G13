import React from "react";
import { type, Select, CheckBox, ReadOnly, AddOptiont, columnsWidth, customColumns } from "./react-bootstrap.model";

// 設定欄位要哪種輸入框
export const columnsType = {
  ID: { editable: true, editorType: "TEXT", editorValue: "" },
  name: { editable: false, editorType: "TEXT", editorValue: "" },
  type: {
    editable: true,
    editorType: "SELECT",
    editorValue: [
      { value: "TEXT", label: "TEXT" },
      { value: "SELECT", label: "SELECT" },
      { value: "TEXTAREA", label: "TEXTAREA" },
      { value: "CHECKBOX", label: "CHECKBOX" },
      { value: "DATE", label: "DATE" },
      { value: "DATETIME", label: "DATETIME" },
    ],
  },
  value: { editable: true, editorType: "TEXTAREA", editorValue: "" },
};

export const CtrlColumns = (elm, editable, editorType, editorValue) => {
  return {
    ...customColumns(elm["column_name"], elm["column_comment"]),
    editable: editable,
    headerStyle: { cursor: "pointer", ...columnsWidth(elm) },
    style: {
      cursor: "default",
      // 當文字超出框時顯示"..."
      wordBreak: "keep-all",
      display: elm["column_name"] === "value" ? "-webkit-box" : "",
      WebkitLineClamp: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
    },
    editor: {
      type: editorType !== "DATETIME" ? type[editorType] : undefined,
      options: editorType === "SELECT" ? editorValue : undefined,
    },
    editorRenderer:
      elm["column_name"] === "value"
        ? (editorProps, value, row) => {
            if (row.type === "CHECKBOX") {
              return <CheckBox {...editorProps} value={value} />;
            } else if (row.type === "SELECT") {
              return <AddOptiont {...editorProps} value={value} />;
            } else if (row.type === "TEXT") {
              return (
                <Select
                  {...editorProps}
                  value={value}
                  options={[
                    { value: "NONE", label: "NONE" },
                    { value: "PK", label: "Primary Key" },
                    { value: "IDCARD", label: "ID card" },
                    { value: "EMAIL", label: "Email" },
                    { value: "TEL", label: "Telephone" },
                  ]}
                />
              );
            } else {
              return <ReadOnly {...editorProps} value={value} />;
            }
          }
        : undefined,
  };
};

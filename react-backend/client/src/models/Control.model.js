import React from "react";

// model
import { customColumn, columnWidth } from "./state.model";
import {
  type,
  CheckBoxInput,
  AddOptiontInput,
  SelectInput,
  TextInput
} from "./react-bootstrap.model";

export const CtrlTableColumns = (elm, editable, editorType, editorValue) => {
  return {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"])[0],
    editable: editable,
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" },
    editor: {
      type: editorType !== "DATETIME" ? type[editorType] : undefined,
      options: editorType === "SELECT" ? editorValue : undefined
    },
    editorRenderer:
      elm["COLUMN_NAME"] === "value"
        ? (editorProps, value, row) => {
            if (row.type === "CHECKBOX") {
              return <CheckBoxInput {...editorProps} value={value} />;
            } else if (row.type === "SELECT") {
              return <AddOptiontInput {...editorProps} value={value} />;
            } else if (row.type === "TEXT") {
              return <SelectInput {...editorProps} value={value} />;
            } else {
              return <TextInput {...editorProps} value={value} />;
            }
          }
        : undefined
  };
};

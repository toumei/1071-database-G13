import { customColumn, columnWidth } from "./state.model";

export const CSVTableColumns = elm => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" },
    csvExport: elm["COLUMN_NAME"] === "ID" ? false : true
  }
];

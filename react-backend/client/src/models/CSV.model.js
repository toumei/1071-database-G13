import { customColumns, columnsWidth } from "./react-bootstrap.model";

export const CSVTableColumns = elm => {
  return {
    ...customColumns(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true),
    headerStyle: { cursor: "pointer", ...columnsWidth(elm)[0] },
    style: { cursor: "default" },
    csvExport: elm["COLUMN_NAME"] === "ID" ? false : true
  };
};

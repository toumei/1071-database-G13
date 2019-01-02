import { customColumns, columnsWidth } from "./react-bootstrap.model";

export const CSVColumns = elm => {
  return {
    ...customColumns(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true),
    headerStyle: { cursor: "pointer", ...columnsWidth(elm) },
    style: { cursor: "default" },
    csvExport: elm["COLUMN_NAME"] === "ID" ? false : true
  };
};

export const CSVColumnsList = [
  { COLUMN_NAME: "ID", COLUMN_COMMENT: "單號" },
  { COLUMN_NAME: "result", COLUMN_COMMENT: "維修結果" },
  { COLUMN_NAME: "name_e", COLUMN_COMMENT: "維修者" },
  { COLUMN_NAME: "date_p", COLUMN_COMMENT: "維修日期" },
  { COLUMN_NAME: "detail", COLUMN_COMMENT: "維修處理" },
  { COLUMN_NAME: "date_m", COLUMN_COMMENT: "時間戳記" },
  { COLUMN_NAME: "bedNum", COLUMN_COMMENT: "寢室床號" },
  { COLUMN_NAME: "name_b", COLUMN_COMMENT: "申請者姓名" },
  { COLUMN_NAME: "time", COLUMN_COMMENT: "方便維修時段" },
  { COLUMN_NAME: "matter", COLUMN_COMMENT: "報修事項" },
  { COLUMN_NAME: "desc", COLUMN_COMMENT: "狀況描述" }
];

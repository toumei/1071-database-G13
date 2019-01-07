// model
import { customColumns, columnsWidth } from "./react-bootstrap.model";

export const CSVColumns = elm => {
  return {
    ...customColumns(elm["column_name"], elm["column_comment"], true),
    headerStyle: { cursor: "pointer", ...columnsWidth(elm) },
    style: { cursor: "default" },
    csvExport: elm["column_name"] === "ID" ? false : true
  };
};

export const CSVColumnsList = [
  { column_name: "ID", column_comment: "單號" },
  { column_name: "result", column_comment: "維修結果" },
  { column_name: "name_e", column_comment: "維修者" },
  { column_name: "date_p", column_comment: "維修日期" },
  { column_name: "detail", column_comment: "維修處理" },
  { column_name: "date_m", column_comment: "時間戳記" },
  { column_name: "bedNum", column_comment: "寢室床號" },
  { column_name: "name_b", column_comment: "申請者姓名" },
  { column_name: "time", column_comment: "方便維修時段" },
  { column_name: "matter", column_comment: "報修事項" },
  { column_name: "desc", column_comment: "狀況描述" }
];

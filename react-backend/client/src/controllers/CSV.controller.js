import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";

import { CSVTableColumns } from "../models/CSV.model";

export function postCSVTableColumns(bind) {
  let data = [
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
  let columns = [];
  data.forEach(elm => {
    columns.push(CSVTableColumns(elm)[0]);
  });
  bind.setState({
    columns: columns
  });
}

export function postCSVTableData(bind) {
  axios
    .post(database + "CSVList")
    .then(res => {
      bind.setState({
        data: decrypt(res.data).filter((x, i) => {
          const date_p = x.date_p.split("T");
          const date_m = x.date_m.split("T");
          x.date_p = date_p[0] + " " + date_p[1].split(".")[0];
          x.date_m = date_m[0] + " " + date_m[1].split(".")[0];
          return x;
        })
      });
    })
    .catch();
}

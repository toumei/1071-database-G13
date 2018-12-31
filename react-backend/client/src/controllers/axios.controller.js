import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import {
  CrudTableColumns,
  CrudTableDeleteColumns,
  CrudTableFormColumns,
  CrudTableModeColumns
} from "../models/CRUD.Table.model";
import { CtrlTableColumns } from "../models/Control.model";
import { CSVTableColumns } from "../models/CSV.model";
import { CrudTableMenuData } from "../models/CRUD.TableMenu.model";

// controller
import { handleInfo } from "./CRUD.Table.controller";

const url = "http://" + (false ? "192.168.42.212" : "localhost") + ":3000/";

export function postCrudTableMenuData(bind) {
  axios
    .post(url + "dbCtrl/TableList")
    .then(res => {
      let data = [];
      decrypt(res.data).forEach(elm => {
        if (elm["TABLE_NAME"][0] !== "_") data.push(CrudTableMenuData(elm)[0]);
      });
      bind.setState({ data: data });
    })
    .catch();
}

export function postCrudTableColumns(bind) {
  axios
    .post(url + "dbCtrl/ColumnList?table=" + bind.state.table)
    .then(res => {
      let columns = [];
      let deleteColumns = [];
      let formColumns = [];
      decrypt(res.data).forEach(elm => {
        columns.push(CrudTableColumns(bind, elm)[0]);
        deleteColumns.push(CrudTableDeleteColumns(elm)[0]);
        formColumns.push(CrudTableFormColumns(elm)[0]);
      });
      columns.push(CrudTableModeColumns(bind)[0]);
      bind.setState({
        columns: columns,
        deleteColumns: deleteColumns,
        formColumns: formColumns
      });
    })
    .catch();
}

export function postCtrlTableColumns(bind) {
  axios
    .post(url + "dbCtrl/CtrlList?table=_coloption")
    .then(res => {
      let columns = [];
      decrypt(res.data).forEach(elm => {
        if (elm["COLUMN_NAME"] === "name") {
          columns.push(CtrlTableColumns(bind, elm, false, "TEXT")[0]);
        } else if (elm["COLUMN_NAME"] === "type") {
          columns.push(
            CtrlTableColumns(bind, elm, true, "SELECT", [
              {
                value: "TEXT",
                label: "TEXT"
              },
              {
                value: "SELECT",
                label: "SELECT"
              },
              {
                value: "TEXTAREA",
                label: "TEXTAREA"
              },
              {
                value: "CHECKBOX",
                label: "CHECKBOX"
              },
              {
                value: "DATE",
                label: "DATE"
              },
              {
                value: "DATETIME",
                label: "DATETIME"
              }
            ])[0]
          );
        } else if (elm["COLUMN_NAME"] === "value") {
          columns.push(CtrlTableColumns(bind, elm, true, "TEXTAREA")[0]);
        } else {
          columns.push(CtrlTableColumns(bind, elm, true, "TEXT")[0]);
        }
      });
      bind.setState({ columns: columns });
    })
    .catch();
}

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

export function postCrudTableData(bind) {
  axios
    .post(url + "dbCtrl/List?table=" + bind.state.table)
    .then(res => {
      bind.setState({ data: decrypt(res.data) });
    })
    .catch();
}

export function postAnalysisTableData(bind) {
  axios
    .post(url + "dbCtrl/AnalysisSum")
    .then(res => {
      const newData = decrypt(res.data);
      let dataList = [];
      for (let i = 0; i < newData.length; i++) {
        dataList[i] = newData[i][0]["COUNT(*)"];
      }
      bind.setState({ sum: dataList });
    })
    .catch();
}

export function postCtrlTableData(bind) {
  axios
    .post(url + "dbCtrl/List?table=_coloption")
    .then(res => {
      bind.setState({
        data: decrypt(res.data).filter((x, i) => {
          if (x.type === "SELECT") {
            x.value = JSON.stringify(x.value);
          }
          return x.name !== "ID";
        })
      });
    })
    .catch();
}

export function postCSVTableData(bind) {
  axios
    .post(url + "dbCtrl/CSVList")
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

export function postCrudDelete(bind, row, info) {
  axios
    .post(url + "dbCtrl/delete", { table: bind.state.table, id: row.ID })
    .catch();
  handleInfo(bind, {
    title: "警告",
    content: info,
    cancel: false
  });
}

export function postCrudAdd(bind, row) {
  axios
    .post(url + "dbCtrl/add", { table: bind.state.table, row: row })
    .then(res => {
      row["ID"] = res.data.id;
      bind.setState({ data: [...bind.state.data, row] });
    })
    .catch();
  handleInfo(bind, {
    title: "警告",
    content: "新增成功",
    cancel: false
  });
}

export function postCrudEdit(bind, row, info = "") {
  if (row.date !== undefined) {
    row.date = row.date.split(".")[0];
  }
  axios
    .post(url + "dbCtrl/update", {
      table: bind.state.table,
      row: row
    })
    .then(res => {})
    .catch();
  if (info !== "")
    handleInfo(bind, {
      title: "警告",
      content: info,
      cancel: false
    });
}

export function postCtrlEdit(row) {
  axios
    .post(url + "dbCtrl/CtrlUpdate", {
      row: row
    })
    .then(res => {})
    .catch();
}

export async function postCrudSearch(bind, search, id, callback) {
  await axios
    .post(url + "dbCtrl/searchColumnID", {
      table: bind.state.table,
      search: search,
      id: id
    })
    .then(res => {
      callback(decrypt(res.data));
    })
    .catch();
}

export function postAnalysisRepairData(bind) {
  axios
    .post(url + "dbCtrl/AnalysisRepair")
    .then(res => {
      const newData = decrypt(res.data);
      let malfunction = [];
      let processing = [];
      let repair = [];
      let tmpMonth = bind.Month + 1;
      let tmpPonit = 0;
      for (let i = 0; i < newData[0].length; i++) {
        for (let j = tmpMonth; j < newData[0][i]["month"]; j++) {
          malfunction[tmpPonit] = 0;
          tmpPonit++;
        }
        malfunction[tmpPonit] = newData[0][i]["COUNT(*)"];
        tmpMonth = newData[0][i]["month"] + 1;
        tmpPonit++;
      }
      tmpMonth = bind.Month + 1;
      tmpPonit = 0;
      for (let i = 0; i < newData[1].length; i++) {
        for (let j = tmpMonth; j < newData[1][i]["month"]; j++) {
          processing[tmpPonit] = 0;
          tmpPonit++;
        }
        processing[tmpPonit] = newData[1][i]["COUNT(*)"];
        tmpMonth = newData[1][i]["month"] + 1;
        tmpPonit++;
      }
      tmpMonth = bind.Month + 1;
      tmpPonit = 0;
      for (let i = 0; i < newData[1].length; i++) {
        for (let j = tmpMonth; j < newData[1][i]["month"]; j++) {
          repair[tmpPonit] = 0;
          tmpPonit++;
        }
        repair[tmpPonit] = newData[1][i]["COUNT(*)"];
        tmpMonth = newData[1][i]["month"] + 1;
        tmpPonit++;
      }
      let max = Math.max(malfunction.length, processing.length);
      for (let i = malfunction.length; i < max; i++) {
        malfunction[i] = 0;
      }
      for (let i = processing.length; i < max; i++) {
        processing[i] = 0;
      }
      for (let i = repair.length; i < max; i++) {
        repair[i] = 0;
      }
      for (let i = 0; i < max; i++) {
        if (malfunction[i] === 0) {
          repair[i] = 0;
        } else {
          repair[i] = repair[i] / malfunction[i];
        }
      }
      bind.state.data.datasets[0].data = repair;
      bind.state.data.datasets[1].data = malfunction;
      bind.state.data.datasets[2].data = processing;
    })
    .catch();
}

export function postAnalysisMalfunctionData(bind) {
  axios
    .post(url + "dbCtrl/AnalysisMalfunction")
    .then(res => {
      const newData = decrypt(res.data);
      let matterLabel = [];
      let matterData = [];
      for (let i = 0; i < newData[0][0].value.length; i++) {
        matterLabel[i] = newData[0][0].value[i]["label"];
      }
      for (let i = 0; i < matterLabel.length; i++) {
        matterData[i] = 0;
        for (let j = 0; j < newData[1].length; j++) {
          if (matterLabel[i] === newData[1][j]["matter"]) {
            matterData[i] = newData[1][j]["COUNT(*)"];
            break;
          }
        }
      }
      bind.state.data.datasets[0].data = matterData;
      bind.state.data.labels = matterLabel;
    })
    .catch();
}

export function postAnalysisProcessingData(bind) {
  axios
    .post(url + "dbCtrl/AnalysisProcessing")
    .then(res => {
      const newData = decrypt(res.data);
      let processingLabel = [];
      let processingData = [];
      for (let i = 0; i < newData[0][0].value.length; i++) {
        processingLabel[i] = newData[0][0].value[i]["label"];
      }
      for (let i = 0; i < processingLabel.length; i++) {
        processingData[i] = 0;
        for (let j = 0; j < newData[1].length; j++) {
          if (processingLabel[i] === newData[1][j]["result"]) {
            processingData[i] = newData[1][j]["COUNT(*)"];
            break;
          }
        }
      }
      bind.state.data.datasets[0].data = processingData;
      bind.state.data.labels = processingLabel;
    })
    .catch();
}

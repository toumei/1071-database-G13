import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import {
  TableData,
  TableColumns,
  TableModeColumns,
  TableDeleteColumns
} from "../models/DBTable.model";

// controller
import { handleInfo } from "./DBTable.controller";

const ip = false ? "192.168.42.212" : "localhost";

export function postDatabaseData(bindDatabase) {
  axios.post("http://" + ip + ":3000/dbCtrl/TableList").then(res => {
    let data = [];
    decrypt(res.data).forEach(elm => {
      // if (elm["TABLE_NAME"][0] !== "_")
      data.push(TableData(elm)[0]);
    });
    bindDatabase.setState({ data: data });
  });
}

export function postTableColumnsData(bindTable) {
  axios
    .post(
      "http://" + ip + ":3000/dbCtrl/ColumnList?table=" + bindTable.state.table
    )
    .then(res => {
      let columns = [];
      let deleteColumns = [];
      decrypt(res.data).forEach(elm => {
        columns.push(TableColumns(bindTable, elm)[0]);
        deleteColumns.push(TableDeleteColumns(elm)[0]);
      });
      columns.push(TableModeColumns(bindTable)[0]);
      bindTable.setState({
        columns: columns,
        deleteColumns: deleteColumns
      });
    });
}

export function postTableData(bindTable) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/List?table=" + bindTable.state.table)
    .then(res => {
      bindTable.setState({ data: decrypt(res.data) });
    });
}

export function postDelete(bindTable, row, info) {
  axios.post("http://" + ip + ":3000/dbCtrl/delete", {
    table: bindTable.state.table,
    id: row.ID
  });
  handleInfo(bindTable, { title: "警告", content: info, cancel: false });
}

export function postAdd(bindTable, row) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/add", {
      table: bindTable.state.table,
      row: row
    })
    .then(res => {
      row["ID"] = res.data.id;
      bindTable.setState({
        data: [...bindTable.state.data, row]
      });
    });
  handleInfo(bindTable, {
    title: "警告",
    content: "新增成功",
    cancel: false
  });
}

export function postEdit(bindTable, row, info = "") {
  axios
    .post("http://" + ip + ":3000/dbCtrl/update", {
      table: bindTable.state.table,
      row: row
    })
    .then(res => {});
  if (info !== "")
    handleInfo(bindTable, { title: "警告", content: info, cancel: false });
}

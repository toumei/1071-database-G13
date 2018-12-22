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

export function postTableMenuData(bind) {
  axios.post("http://" + ip + ":3000/dbCtrl/TableList").then(res => {
    let data = [];
    decrypt(res.data).forEach(elm => {
      // if (elm["TABLE_NAME"][0] !== "_")
      data.push(TableData(elm)[0]);
    });
    bind.setState({ data: data });
  });
}

export function postTableColumnsData(bind) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/ColumnList?table=" + bind.state.table)
    .then(res => {
      let columns = [];
      let deleteColumns = [];
      decrypt(res.data).forEach(elm => {
        columns.push(TableColumns(bind, elm)[0]);
        deleteColumns.push(TableDeleteColumns(elm)[0]);
      });
      columns.push(TableModeColumns(bind)[0]);
      bind.setState({
        columns: columns,
        deleteColumns: deleteColumns
      });
    });
}

export function postTableData(bind) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/List?table=" + bind.state.table)
    .then(res => {
      bind.setState({ data: decrypt(res.data) });
    });
}

export function postDelete(bind, row, info) {
  axios.post("http://" + ip + ":3000/dbCtrl/delete", {
    table: bind.state.table,
    id: row.ID
  });
  handleInfo(bind, {
    title: "警告",
    content: info,
    cancel: false
  });
}

export function postAdd(bind, row) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/add", {
      table: bind.state.table,
      row: row
    })
    .then(res => {
      row["ID"] = res.data.id;
      bind.setState({ data: [...bind.state.data, row] });
    });
  handleInfo(bind, {
    title: "警告",
    content: "新增成功",
    cancel: false
  });
}

export function postEdit(bind, row, info = "") {
  axios
    .post("http://" + ip + ":3000/dbCtrl/update", {
      table: bind.state.table,
      row: row
    })
    .then(res => {});
  if (info !== "")
    handleInfo(bind, {
      title: "警告",
      content: info,
      cancel: false
    });
}

import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import {
  TableColumns,
  TableDeleteColumns,
  TableFormColumns,
  TableModeColumns
} from "../models/DBTable.model";
import { TableMenuData } from "../models/DBTableMenu.model";

// controller
import { handleInfo } from "./DBTable.controller";

const url = "http://" + (false ? "192.168.42.212" : "localhost") + ":3000/";

export function postTableMenuData(bind) {
  axios.post(url + "dbCtrl/TableList").then(res => {
    let data = [];
    decrypt(res.data).forEach(elm => {
      // if (elm["TABLE_NAME"][0] !== "_")
      data.push(TableMenuData(elm)[0]);
    });
    bind.setState({ data: data });
  });
}

export function postTableColumns(bind) {
  axios.post(url + "dbCtrl/ColumnList?table=" + bind.state.table).then(res => {
    let columns = [];
    let deleteColumns = [];
    let formColumns = [];
    decrypt(res.data).forEach(elm => {
      columns.push(TableColumns(bind, elm)[0]);
      deleteColumns.push(TableDeleteColumns(elm)[0]);
      formColumns.push(TableFormColumns(elm)[0]);
    });
    columns.push(TableModeColumns(bind)[0]);
    bind.setState({
      columns: columns,
      deleteColumns: deleteColumns,
      formColumns: formColumns
    });
  });
}

export function postTableData(bind) {
  axios.post(url + "dbCtrl/List?table=" + bind.state.table).then(res => {
    bind.setState({ data: decrypt(res.data) });
  });
}

export function postDelete(bind, row, info) {
  axios.post(url + "dbCtrl/delete", { table: bind.state.table, id: row.ID });
  handleInfo(bind, {
    title: "警告",
    content: info,
    cancel: false
  });
}

export function postAdd(bind, row) {
  axios
    .post(url + "dbCtrl/add", { table: bind.state.table, row: row })
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
    .post(url + "dbCtrl/update", { table: bind.state.table, row: row })
    .then(res => {});
  if (info !== "")
    handleInfo(bind, {
      title: "警告",
      content: info,
      cancel: false
    });
}

import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import {
  CrudTableColumns,
  CrudTableDeleteColumns,
  CrudTableFormColumns,
  CrudTableModeColumns,
  CtrlTableColumns
} from "../models/CRUD.Table.model";
import { CrudTableMenuData } from "../models/CRUD.TableMenu.model";

// controller
import { handleInfo } from "./CRUD.Table.controller";

const url = "http://" + (true ? "192.168.42.212" : "localhost") + ":3000/";

export function postCrudTableMenuData(bind) {
  axios.post(url + "dbCtrl/TableList").then(res => {
    let data = [];
    decrypt(res.data).forEach(elm => {
      if (elm["TABLE_NAME"][0] !== "_") data.push(CrudTableMenuData(elm)[0]);
    });
    bind.setState({ data: data });
  });
}

export function postCrudTableColumns(bind) {
  axios.post(url + "dbCtrl/ColumnList?table=" + bind.state.table).then(res => {
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
  });
}

export function postCtrlTableColumns(bind) {
  axios.post(url + "dbCtrl/CtrlList?table=_coloption").then(res => {
    let columns = [];
    decrypt(res.data).forEach(elm => {
      columns.push(CtrlTableColumns(bind, elm)[0]);
    });
    bind.setState({
      columns: columns
    });
  });
}

export function postCrudTableData(bind) {
  axios.post(url + "dbCtrl/List?table=" + bind.state.table).then(res => {
    bind.setState({ data: decrypt(res.data) });
  });
}

export function postCtrlTableData(bind) {
  axios.post(url + "dbCtrl/List?table=_coloption").then(res => {
    bind.setState({ data: decrypt(res.data) });
  });
}

export function postCrudDelete(bind, row, info) {
  axios.post(url + "dbCtrl/delete", {
    table: bind.state.table,
    id: row.ID
  });
  handleInfo(bind, {
    title: "警告",
    content: info,
    cancel: false
  });
}

export function postCrudAdd(bind, row) {
  axios
    .post(url + "dbCtrl/add", {
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

export function postCrudEdit(bind, row, info = "") {
  axios
    .post(url + "dbCtrl/update", {
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

import axios from "axios";

// model
import { decryptM } from "../models/crypt.model";

// controller
import {
  TableDataC,
  TableColumnsC,
  TableModeColumnsC,
  TableDeleteColumnsC,
  TableSelectC
} from "./state.controller";

const ip = true ? "192.168.42.212" : "localhost";

export function postTableListC(bind) {
  axios.post("http://" + ip + ":3000/dbCtrl/TableList").then(res => {
    let data = [];
    decryptM(res.data).forEach(element => {
      data.push(TableDataC(element)[0]);
    });
    bind.setState({ data: data });
  });
}

export function postColumnListC(bind) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/ColumnList?table=" + bind.state.table)
    .then(res => {
      let columns = [];
      let deleteColumns = [];
      columns.push(TableSelectC(bind)[0]);
      decryptM(res.data).forEach(element => {
        columns.push(TableColumnsC(element)[0]);
        deleteColumns.push(TableDeleteColumnsC(element)[0]);
      });
      columns.push(TableModeColumnsC(bind)[0]);
      bind.setState({
        columns: columns,
        deleteColumns: deleteColumns
      });
    });
}

export function postListC(bind) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/List?table=" + bind.state.table)
    .then(res => {
      let data = [...decryptM(res.data)];
      data = data.map(row => {
        return { ...row, isSelect: false };
      });
      bind.setState({ data: data });
    });
}

export function postDeleteC(bind, row) {
  axios.post("http://" + ip + ":3000/dbCtrl/delete", {
    table: bind.state.table,
    id: row.ID
  });
}

export function postAddC(bind, row) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/add", {
      table: bind.state.table,
      row: row
    })
    .then(res => {
      row["ID"] = res.data.id;
      bind.setState({ data: [...bind.state.data, row] });
    });
}

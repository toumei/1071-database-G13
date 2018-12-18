import axios from "axios";

// model
import { decryptM } from "../models/crypt.model";

// controller
import {
  TableDataC,
  TableColumnsC,
  TableModeColumnsC,
  TableDeleteColumnsC
} from "./state.controller";

const ip = true ? "192.168.42.212" : "localhost";

export function postDatabaseDataC(bindDatabase) {
  axios.post("http://" + ip + ":3000/dbCtrl/TableList").then(res => {
    let data = [];
    decryptM(res.data).forEach(elm => {
      data.push(TableDataC(elm)[0]);
    });
    bindDatabase.setState({ data: data });
  });
}

export function postTableColumnsDataC(bindTable) {
  axios
    .post(
      "http://" + ip + ":3000/dbCtrl/ColumnList?table=" + bindTable.state.table
    )
    .then(res => {
      let columns = [];
      let deleteColumns = [];
      decryptM(res.data).forEach(elm => {
        columns.push(TableColumnsC(elm)[0]);
        deleteColumns.push(TableDeleteColumnsC(elm)[0]);
      });
      columns.push(TableModeColumnsC(bindTable)[0]);
      bindTable.setState({
        columns: columns,
        deleteColumns: deleteColumns
      });
    });
}

export function postTableDataC(bindTable) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/List?table=" + bindTable.state.table)
    .then(res => {
      bindTable.setState({ data: decryptM(res.data) });
    });
}

export function postDeleteC(bindTable, row) {
  axios.post("http://" + ip + ":3000/dbCtrl/delete", {
    table: bindTable.state.table,
    id: row.ID
  });
}

export function postAddC(bindTable, bindTableNav, row) {
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
      bindTableNav.setState({ addInfo: "新增成功" });
    });
}

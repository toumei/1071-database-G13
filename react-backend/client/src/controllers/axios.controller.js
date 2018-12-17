import axios from "axios";
import { decrypt } from "../models/crypt.model";
import {
  tableColumns1,
  tableColumns2,
  tableColumns3,
  tableColumns4
} from "./state.controller";
const Uip = "192.168.42.212";
const ip = true ? Uip : "localhost";

export function getTableList(bind) {
  axios.post("http://" + ip + ":3000/dbCtrl/TableList").then(response => {
    const decryptedJSON = decrypt(response.data);
    let data = [];
    decryptedJSON.forEach(element => {
      data.push(tableColumns1(element)[0]);
    });
    bind.setState({ data: data });
  });
}

export function getColumnList(bind) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/ColumnList?table=" + bind.state.table)
    .then(response => {
      let columns = [];
      let deleteColumns = [];
      decrypt(response.data).forEach(element => {
        columns.push(tableColumns2(element)[0]);
        deleteColumns.push(tableColumns4(element)[0]);
      });
      columns.push(tableColumns3(bind)[0]);
      bind.setState({ columns: columns, deleteColumns: deleteColumns });
    });
}

export function getList(bind) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/List?table=" + bind.state.table)
    .then(response => {
      bind.setState({ data: decrypt(response.data) });
    });
}

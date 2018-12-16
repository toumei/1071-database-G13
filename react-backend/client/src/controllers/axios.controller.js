import axios from "axios";
import { decrypt } from "../models/crypt.model";
import {
  tableColumns1,
  tableColumns2,
  tableColumns3
} from "./state.controller";
const Uip = "192.168.42.212";
const ip = true ? Uip : "localhost";

export function getTableList(db) {
  axios.post("http://" + ip + ":3000/dbCtrl/TableList").then(response => {
    const decryptedJSON = decrypt(response.data);
    let data = [];
    decryptedJSON.forEach(element => {
      data.push(tableColumns1(element)[0]);
    });
    db.setState({ data: data });
  });
}

export function getColumnList(db) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/ColumnList?table=" + db.state.table)
    .then(response => {
      let columns = [];
      let deleteColumns = [];
      decrypt(response.data).forEach(element => {
        columns.push(tableColumns2(element)[0]);
        deleteColumns.push({
          dataField: element["COLUMN_NAME"],
          text: element["COLUMN_COMMENT"],
          headerAlign: "center",
          align: "center",
          headerStyle: {
            width: element["COLUMN_NAME"] === "ID" ? "" : "100rem",
            minWidth: element["COLUMN_NAME"] === "ID" ? "" : "10rem"
          },
          style: { cursor: "default" }
        });
      });
      columns.push(tableColumns3(db)[0]);
      db.setState({ columns: columns, deleteColumns: deleteColumns });
    });
}

export function getList(db) {
  axios
    .post("http://" + ip + ":3000/dbCtrl/List?table=" + db.state.table)
    .then(response => {
      db.setState({
        data: decrypt(response.data)
      });
    });
}

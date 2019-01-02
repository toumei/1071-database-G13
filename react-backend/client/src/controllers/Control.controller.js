import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";
import { columnsType, CtrlTableColumns } from "../models/Control.model";

export function postCtrlTableColumns(bind) {
  axios
    .post(database + "ColumnsMsgList", {
      table: "_coloption"
    })
    .then(res => {
      let columns = [];
      decrypt(res.data).forEach(elm => {
        columns.push(
          CtrlTableColumns(
            elm,
            columnsType[elm["COLUMN_NAME"]].editable,
            columnsType[elm["COLUMN_NAME"]].editorType,
            columnsType[elm["COLUMN_NAME"]].editorValue
          )
        );
      });
      bind.setState({ columns: columns });
    })
    .catch();
}

export function postCtrlTableData(bind) {
  axios
    .post(database + "List", { table: "_coloption" })
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

export function postCtrlEdit(row) {
  axios
    .post(database + "CtrlUpdate", {
      row: row
    })
    .then(res => {})
    .catch();
}

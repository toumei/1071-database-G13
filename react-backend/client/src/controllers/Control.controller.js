import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";
import { CtrlTableColumns } from "../models/Control.model";

export function postCtrlTableColumns(bind) {
  axios
    .post(database + "ColumnsMsgList", {
      table: "_coloption"
    })
    .then(res => {
      let columns = [];
      decrypt(res.data).forEach(elm => {
        if (elm["COLUMN_NAME"] === "name") {
          columns.push(CtrlTableColumns(elm, false, "TEXT"));
        } else if (elm["COLUMN_NAME"] === "type") {
          columns.push(
            CtrlTableColumns(elm, true, "SELECT", [
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
            ])
          );
        } else if (elm["COLUMN_NAME"] === "value") {
          columns.push(CtrlTableColumns(elm, true, "TEXTAREA"));
        } else {
          columns.push(CtrlTableColumns(elm, true, "TEXT"));
        }
      });
      bind.setState({ columns: columns });
    })
    .catch();
}

export function postCtrlTableData(bind) {
  axios
    .post(database + "List?table=_coloption")
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

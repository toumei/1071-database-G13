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
  axios
    .post(url + "dbCtrl/TableList")
    .then(res => {
      let data = [];
      decrypt(res.data).forEach(elm => {
        if (elm["TABLE_NAME"][0] !== "_") data.push(CrudTableMenuData(elm)[0]);
      });
      bind.setState({ data: data });
    })
    .catch();
}

export function postCrudTableColumns(bind) {
  axios
    .post(url + "dbCtrl/ColumnList?table=" + bind.state.table)
    .then(res => {
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
    })
    .catch();
}

export function postCtrlTableColumns(bind) {
  axios
    .post(url + "dbCtrl/CtrlList?table=_coloption")
    .then(res => {
      let columns = [];
      decrypt(res.data).forEach(elm => {
        if (elm["COLUMN_NAME"] === "name") {
          columns.push(CtrlTableColumns(bind, elm, false, "TEXT")[0]);
        } else if (elm["COLUMN_NAME"] === "type") {
          columns.push(
            CtrlTableColumns(bind, elm, true, "SELECT", [
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
            ])[0]
          );
        } else if (elm["COLUMN_NAME"] === "value") {
          columns.push(CtrlTableColumns(bind, elm, true, "TEXTAREA")[0]);
        } else {
          columns.push(CtrlTableColumns(bind, elm, true, "TEXT")[0]);
        }
      });
      bind.setState({ columns: columns });
    })
    .catch();
}

export function postCrudTableData(bind) {
  axios
    .post(url + "dbCtrl/List?table=" + bind.state.table)
    .then(res => {
      bind.setState({ data: decrypt(res.data) });
    })
    .catch();
}

export function postCtrlTableData(bind) {
  axios
    .post(url + "dbCtrl/List?table=_coloption")
    .then(res => {
      bind.setState({ data: decrypt(res.data) });
    })
    .catch();
}

export function postCrudDelete(bind, row, info) {
  axios
    .post(url + "dbCtrl/delete", { table: bind.state.table, id: row.ID })
    .catch();
  handleInfo(bind, {
    title: "警告",
    content: info,
    cancel: false
  });
}

export function postCrudAdd(bind, row) {
  axios
    .post(url + "dbCtrl/add", { table: bind.state.table, row: row })
    .then(res => {
      row["ID"] = res.data.id;
      bind.setState({ data: [...bind.state.data, row] });
    })
    .catch();
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
    .then(res => {})
    .catch();
  if (info !== "")
    handleInfo(bind, {
      title: "警告",
      content: info,
      cancel: false
    });
}

export function postCtrlEdit(row) {
  axios
    .post(url + "dbCtrl/update", { table: "_coloption", row: row })
    .then(res => {})
    .catch();
}

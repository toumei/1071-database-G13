// controller
import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { url } from "../models/axios.model";
import {
  CrudTableColumns,
  CrudTableDeleteColumns,
  CrudTableFormColumns,
  CrudTableModeColumns
} from "../models/CRUD.Table.model";

// table nav add
export function handleAddItem(bind, row) {
  postCrudTableAdd(bind, row);
}

// table select
export function addSelect(bind, row) {
  bind.select = [...bind.select, ...row];
}

export function deleteSelect(bind, row) {
  bind.select = bind.select.filter((x, i) => x !== row);
}

// table nav select
export function handleGetSelect(bind) {
  bind.setState({});
}

// table nav delete
export function handleDeleteItem(bind, row, isBottom, info) {
  if (isBottom) {
    let newData = bind.state.data;
    let newSelect = bind.select;
    row.filter((x, i) => {
      newData = newData.filter((xx, i) => x !== xx);
      newSelect = newSelect.filter((xx, i) => x !== xx);
      return false;
    });
    bind.select = newSelect;
    bind.setState({ data: newData });
  } else {
    info += "成功刪除ID:" + row.ID + "<br />";
    postCrudTableDelete(bind, row, info);
  }
}

// table edit or delete
export function getItem(bind, row) {
  bind.setState({ itemData: [row] });
}

export function deleteItem(bind, row) {
  postCrudTableDelete(bind, row, "成功刪除ID:" + row.ID);
  bind.setState({ data: bind.state.data.filter((x, i) => x !== row) });
}

// table edit
export function editItem(bind, row) {
  postCrudTableEdit(bind, row, "成功編輯ID:" + row.ID);
  bind.state.data.filter((x, i) => {
    if (x === bind.state.itemData[0]) {
      const data = bind.state.data;
      data[i] = row;
      bind.setState({ data: data });
      return true;
    }
    return false;
  });
}

// handle info
export function handleInfo(bind, info) {
  bind.setState({ info: [info] });
  document.getElementById("info").click();
}

export function handleEditable(bind) {
  new Promise((resolve, reject) => {
    bind.setState({
      info: [
        {
          title: "警告",
          content:
            "確定要" + (bind.state.editable ? "關閉" : "開啟") + "快速編輯",
          cancel: true
        }
      ]
    });
    document.getElementById("info").click();
    document.getElementById("infoTrue").addEventListener("click", () => {
      resolve(true);
    });
    document.getElementById("infoFalse").addEventListener("click", () => {
      resolve(false);
    });
  }).then(res => {
    if (res) {
      bind.setState({ editable: !bind.state.editable });
      const newColumns = bind.state.columns;
      for (let i = 0; i < newColumns.length; i++) {
        newColumns[i].editable = bind.state.editable;
      }
      bind.setState({ columns: newColumns });
    }
  });
}

export function editForm(bind) {
  const newColumns = JSON.parse(
    JSON.stringify(
      bind.state.columns.map((x, i) => {
        return {
          COLUMN_NAME: x.dataField,
          COLUMN_COMMENT: x.text
        };
      })
    )
  );
  let row = { ID: bind.state.itemData[0].ID };
  for (let i = 1; i < newColumns.length - 1; i++) {
    if (
      document.getElementById(newColumns[i].COLUMN_NAME + "Edit").value !== ""
    ) {
      row[newColumns[i].COLUMN_NAME] = document.getElementById(
        newColumns[i].COLUMN_NAME + "Edit"
      ).value;
    } else {
      row[newColumns[i].COLUMN_NAME] = document.getElementById(
        newColumns[i].COLUMN_NAME + "Edit"
      ).placeholder;
    }
  }
  editItem(bind, row);
  for (let i = 1; i < newColumns.length - 1; i++) {
    document.getElementById(newColumns[i].COLUMN_NAME + "Edit").value = "";
  }
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

export function postCrudTableData(bind) {
  axios
    .post(url + "dbCtrl/List?table=" + bind.state.table)
    .then(res => {
      bind.setState({ data: decrypt(res.data) });
    })
    .catch();
}

export function postCrudTableEdit(bind, row, info = "") {
  if (row.date !== undefined) {
    row.date = row.date.split(".")[0];
  }
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

export function postCrudTableDelete(bind, row, info) {
  axios
    .post(url + "dbCtrl/delete", {
      table: bind.state.table,
      id: row.ID
    })
    .catch();
  handleInfo(bind, {
    title: "警告",
    content: info,
    cancel: false
  });
}

export function postCrudTableAdd(bind, row) {
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

export async function postCrudSearch(bind, search, id, callback) {
  await axios
    .post(url + "dbCtrl/searchColumnID", {
      table: bind.state.table,
      search: search,
      id: id
    })
    .then(res => {
      callback(decrypt(res.data));
    })
    .catch();
}

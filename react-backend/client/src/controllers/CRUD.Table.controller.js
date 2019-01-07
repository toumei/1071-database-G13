// model
import { decrypt } from "../models/crypt.model";
import {
  CrudTableColumns,
  CrudTableDeleteColumns,
  CrudTableModeColumns
} from "../models/CRUD.Table.model";

// controller
import apiRequest from "../api/apiRequest";

// table nav add
export const handleAddItem = (bind, row) => {
  postCrudTableAdd(bind, row);
};

// table select
export const addSelect = (bind, row) => {
  bind.select = [...bind.select, ...row];
};

export const deleteSelect = (bind, row) => {
  bind.select = bind.select.filter((x, i) => x !== row);
};

// table nav select
export const handleGetSelect = bind => {
  bind.setState({});
};

// table nav delete
export const handleDeleteItem = (bind, row, isBottom, info) => {
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
    deleteCrudTable(bind, row, info);
  }
};

// table edit or delete
export const getItem = (bind, row) => {
  bind.setState({ itemData: [row] });
};

export const deleteItem = (bind, row) => {
  deleteCrudTable(bind, row, "成功刪除ID:" + row.ID);
  bind.setState({ data: bind.state.data.filter((x, i) => x !== row) });
};

// table edit
export const editItem = (bind, row) => {
  putCrudTableEdit(bind, row, "成功編輯ID:" + row.ID);
  bind.state.data.filter((x, i) => {
    if (x === bind.state.itemData[0]) {
      const data = bind.state.data;
      data[i] = row;
      bind.setState({ data: data });
      return true;
    }
    return false;
  });
};

// handle info
export const handleInfo = (bind, info) => {
  bind.setState({ info: [info] });
  document.getElementById("info").click();
};

export const handleEditable = bind => {
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
};

export const editForm = bind => {
  const newColumns = bind.state.formColumns;
  let row = { ID: bind.state.itemData[0].ID };
  let isNull = false;
  // let info = "";
  for (let i = 1; i < newColumns.length; i++) {
    if (
      newColumns[i].value === "PK" ||
      newColumns[i].type === "DATE" ||
      newColumns[i].type === "DATETIME"
    ) {
      if (
        document.getElementById(newColumns[i].COLUMN_NAME + "Edit").value === ""
      ) {
        isNull = true;
        // info += newColumns[i].COLUMN_COMMENT + "請勿留白<br />";
      }
    }
    if (newColumns[i].type === "CHECKBOX") {
      if (
        document.getElementById(newColumns[i].COLUMN_NAME + "TrueEdit")
          .checked === true
      ) {
        row[newColumns[i].COLUMN_NAME] = document.getElementById(
          newColumns[i].COLUMN_NAME + "TrueEdit"
        ).value;
      } else {
        row[newColumns[i].COLUMN_NAME] = document.getElementById(
          newColumns[i].COLUMN_NAME + "FalseEdit"
        ).value;
      }
    } else {
      row[newColumns[i].COLUMN_NAME] =
        document.getElementById(newColumns[i].COLUMN_NAME + "Edit").value === ""
          ? null
          : document.getElementById(newColumns[i].COLUMN_NAME + "Edit").value;
    }
  }
  if (!isNull) {
    editItem(bind, row);
  }
};

export const getCrudTableColumns = bind => {
  apiRequest
    .get("/database/" + "ColumnList", { table: bind.state.table })
    .then(res => {
      let columns = [];
      let deleteColumns = [];
      let formColumns = [];
      decrypt(res.data).forEach(elm => {
        columns.push(CrudTableColumns(bind, elm));
        deleteColumns.push(CrudTableDeleteColumns(elm));
        formColumns.push(elm);
      });
      columns.push(CrudTableModeColumns(bind));
      bind.setState({
        columns: columns,
        deleteColumns: deleteColumns,
        formColumns: formColumns
      });
    })
    .catch();
};

export const getCrudTableData = bind => {
  apiRequest
    .get("/database/" + "List", {
      table: bind.state.table
    })
    .then(res => {
      if (res.data) {
        bind.setState({
          data: decrypt(res.data).filter((x, i) => {
            if (x.date !== undefined) {
              x.date = x.date.split(".")[0];
            }
            return x;
          })
        });
      }
    })
    .catch();
};

export const putCrudTableEdit = (bind, row, info = "") => {
  apiRequest
    .put("/database/" + "update", { table: bind.state.table, row: row })
    .then(res => {})
    .catch();
  if (info !== "")
    handleInfo(bind, {
      title: "警告",
      content: info,
      cancel: false
    });
};

export const deleteCrudTable = (bind, row, info) => {
  apiRequest
    .delete("/database/" + "delete", {
      table: bind.state.table,
      id: row.ID
    })
    .catch();
  handleInfo(bind, {
    title: "警告",
    content: info,
    cancel: false
  });
};

export const postCrudTableAdd = (bind, row) => {
  apiRequest
    .post("/database/" + "add", { table: bind.state.table, row: row })
    .then(res => {
      row["ID"] = decrypt(res.data).insertId;
      bind.setState({ data: [...bind.state.data, row] });
    })
    .catch();
  handleInfo(bind, {
    title: "警告",
    content: "新增成功",
    cancel: false
  });
};

export const getCrudSearch = async (bind, search, id, callback) => {
  await apiRequest
    .get("/database/" + "searchColumnID", {
      table: bind.state.table,
      search: search,
      id: id
    })
    .then(res => {
      callback(decrypt(res.data));
    })
    .catch();
};

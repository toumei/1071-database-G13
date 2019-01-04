export const addItem = bind => {
  const newColumns = bind.props.columns;
  let row = {};
  let isNull = false;
  let info = "";
  for (let i = 1; i < newColumns.length; i++) {
    if (
      newColumns[i].value === "PK" ||
      newColumns[i].type === "DATE" ||
      newColumns[i].type === "DATETIME"
    ) {
      if (
        document.getElementById(newColumns[i].COLUMN_NAME + "Add").value === ""
      ) {
        isNull = true;
        info += newColumns[i].COLUMN_COMMENT + "請勿留白<br />";
      }
    }
    if (newColumns[i].type === "CHECKBOX") {
      if (
        document.getElementById(newColumns[i].COLUMN_NAME + "TrueAdd")
          .checked === true
      ) {
        row[newColumns[i].COLUMN_NAME] = document.getElementById(
          newColumns[i].COLUMN_NAME + "TrueAdd"
        ).value;
      } else {
        row[newColumns[i].COLUMN_NAME] = document.getElementById(
          newColumns[i].COLUMN_NAME + "FalseAdd"
        ).value;
      }
    } else {
      row[newColumns[i].COLUMN_NAME] =
        document.getElementById(newColumns[i].COLUMN_NAME + "Add").value === ""
          ? null
          : document.getElementById(newColumns[i].COLUMN_NAME + "Add").value;
    }
  }
  if (!isNull) {
    bind.props.handleAddItem(row);
    for (let i = 1; i < newColumns.length; i++) {
      if (newColumns[i].type === "CHECKBOX") {
        document.getElementById(
          newColumns[i].COLUMN_NAME + "TrueAdd"
        ).checked = true;
      } else if (newColumns[i].type === "SELECT") {
        document.getElementById(newColumns[i].COLUMN_NAME + "Add").value =
          newColumns[i].value[0].value;
      } else if (newColumns[i].type === "DATE") {
        const date = new Date();
        const today = `${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        document.getElementById(
          newColumns[i].COLUMN_NAME + "Add"
        ).value = today;
      } else if (newColumns[i].type === "DATETIME") {
        const date = new Date();
        const today = `${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${(
          "0" + date.getHours()
        ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
          "0" + date.getSeconds()
        ).slice(-2)}`;
        document.getElementById(
          newColumns[i].COLUMN_NAME + "Add"
        ).value = today;
      } else {
        document.getElementById(newColumns[i].COLUMN_NAME + "Add").value = "";
      }
    }
  } else {
    bind.props.handleInfo({
      title: "警告",
      content: info,
      cancel: false
    });
  }
};

export const deleteForm = bind => {
  let info = "";
  const deleteList = bind.state.deleteList;
  deleteList.filter((x, i) => {
    bind.props.handleDeleteItem(x, false, info);
    info += "成功刪除ID:" + x.ID + "<br />";
    return false;
  });
  bind.props.handleDeleteItem(deleteList, true, info);
};

export const cancelDelete = (bind, row) => {
  bind.setState({
    deleteList: bind.state.deleteList.filter((x, i) => x !== row)
  });
};

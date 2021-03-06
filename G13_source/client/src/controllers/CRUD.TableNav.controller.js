export const addItem = bind => {
  const newColumns = bind.props.columns;
  let row = {};
  let isNull = false;
  let info = "";
  for (let i = 1; i < newColumns.length; i++) {
    if (newColumns[i].value === "PK") {
      if (
        document.getElementById(newColumns[i].column_name + "Add").value === ""
      ) {
        isNull = true;
        info += newColumns[i].column_comment + "請勿留白<br />";
      }
    }
    if (newColumns[i].type === "CHECKBOX") {
      if (
        document.getElementById(newColumns[i].column_name + "TrueAdd")
          .checked === true
      ) {
        row[newColumns[i].column_name] = document.getElementById(
          newColumns[i].column_name + "TrueAdd"
        ).value;
      } else {
        row[newColumns[i].column_name] = document.getElementById(
          newColumns[i].column_name + "FalseAdd"
        ).value;
      }
    } else {
      row[newColumns[i].column_name] =
        document.getElementById(newColumns[i].column_name + "Add").value === ""
          ? null
          : document.getElementById(newColumns[i].column_name + "Add").value;
    }
  }
  if (!isNull) {
    bind.props.handleAddItem(row);
    for (let i = 1; i < newColumns.length; i++) {
      if (newColumns[i].type === "CHECKBOX") {
        document.getElementById(
          newColumns[i].column_name + "TrueAdd"
        ).checked = true;
      } else if (newColumns[i].type === "SELECT") {
        document.getElementById(newColumns[i].column_name + "Add").value =
          newColumns[i].value[0].value;
      } else if (newColumns[i].type === "DATE") {
        const date = new Date();
        const today = `${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        document.getElementById(
          newColumns[i].column_name + "Add"
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
          newColumns[i].column_name + "Add"
        ).value = today;
      } else {
        document.getElementById(newColumns[i].column_name + "Add").value = "";
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

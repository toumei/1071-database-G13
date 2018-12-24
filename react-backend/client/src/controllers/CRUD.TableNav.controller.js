export function addItem(bind) {
  const newColumns = bind.props.columns;
  let row = {};
  let isNull = false;
  let info = "";
  for (let i = 1; i < newColumns.length; i++) {
    if (
      document.getElementById(newColumns[i].COLUMN_NAME + "Add").value === ""
    ) {
      isNull = true;
      info += newColumns[i].COLUMN_COMMENT + "請勿留白<br />";
    } else {
      row[newColumns[i].COLUMN_NAME] = document.getElementById(
        newColumns[i].COLUMN_NAME + "Add"
      ).value;
    }
  }
  if (!isNull) {
    bind.props.handleAddItem(row);
    for (let i = 1; i < newColumns.length; i++) {
      document.getElementById(newColumns[i].COLUMN_NAME + "Add").value = "";
    }
  } else {
    bind.props.handleInfo({
      title: "警告",
      content: info,
      cancel: false
    });
  }
}

export function deleteForm(bind) {
  let info = "";
  const deleteList = bind.state.deleteList;
  deleteList.filter((x, i) => {
    bind.props.handleDeleteItem(x, false, info);
    info += "成功刪除ID:" + x.ID + "<br />";
    return false;
  });
  bind.props.handleDeleteItem(deleteList, true, info);
}

export function cancelDelete(bind, row) {
  bind.setState({
    deleteList: bind.state.deleteList.filter((x, i) => x !== row)
  });
}

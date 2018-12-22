// controller
import {
  postTableColumnsDataC,
  postDeleteC,
  postAddC,
  postEditC
} from "./axios.controller";

// table nav add
export function handleAddItem(bind, row) {
  postAddC(bind, row);
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
    postDeleteC(bind, row, info);
  }
}

// table edit or delete
export function getItem(bind, row) {
  bind.setState({ itemData: [row] });
}

export function deleteItem(bind, row) {
  postDeleteC(bind, row, "成功刪除ID:" + row.ID);
  bind.setState({ data: bind.state.data.filter((x, i) => x !== row) });
}

// table edit
export function editItem(bind, row) {
  postEditC(bind, row, "成功編輯ID:" + row.ID);
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
      postTableColumnsDataC(bind);
    }
  });
}

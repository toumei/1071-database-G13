import apiRequest from "../api/apiRequest";

// model
import { CtrlMsg } from "../models/log.model";
import { decrypt, lowerJSONKey } from "../models/crypt.model";
import { columnsType, CtrlColumns } from "../models/Ctrl.model";

export const postCtrlColumns = bind => {
  const data = { table: "_coloption" };
  CtrlMsg("postCtrlColumns", "send", data);
  apiRequest
    .get("/database/ColumnsMsgList", data)
    .then(res => {
      CtrlMsg("postCtrlColumns", "result", decrypt(res.data));
      let columns = [];
      decrypt(res.data).forEach(elm => {
        elm = lowerJSONKey(elm);
        columns.push(
          // 不同欄位放進不同的輸入框
          CtrlColumns(
            elm,
            columnsType[elm["column_name"]].editable,
            columnsType[elm["column_name"]].editorType,
            columnsType[elm["column_name"]].editorValue
          )
        );
      });
      bind.setState({ columns: columns });
    })
    .catch();
};

export const postCtrlData = bind => {
  const data = { table: "_coloption" };
  CtrlMsg("postCtrlData", "send", data);
  apiRequest
    .get("/database/List", data)
    .then(res => {
      CtrlMsg("postCtrlData", "result", decrypt(res.data));
      // 包裹在裡面的json格式需要經過處裡
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
};

export const postCtrlEdit = (bind, row) => {
  // 包裹在裡面的json格式需要經過處裡
  if (row.type !== "SELECT") {
    row.value = JSON.stringify(row.value);
  }
  const data = { table: "_coloption", row: row };
  CtrlMsg("postCtrlEdit", "send", data);
  apiRequest
    .post("/database/update", data)
    .then(res => {
      // data會被動到，因此要還原
      if (row.type !== "SELECT") {
        row.value = JSON.parse(row.value);
        bind.setState({ data: bind.state.data });
      }
      CtrlMsg("postCtrlEdit", "result", decrypt(res.data));
    })
    .catch();
};

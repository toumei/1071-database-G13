import axios from "axios";

// model
import { CtrlMsg } from "../models/log.model";
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";
import { columnsType, CtrlColumns } from "../models/Ctrl.model";

export const postCtrlColumns = bind => {
  const data = { table: "_coloption" };
  CtrlMsg("postCtrlColumns", "send", data);
  axios
    .post(database + "ColumnsMsgList", data)
    .then(res => {
      CtrlMsg("postCtrlColumns", "result", decrypt(res.data));
      let columns = [];
      decrypt(res.data).forEach(elm => {
        columns.push(
          // 不同欄位放進不同的輸入框
          CtrlColumns(
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
};

export const postCtrlData = bind => {
  const data = { table: "_coloption" };
  CtrlMsg("postCtrlData", "send", data);
  axios
    .post(database + "List", data)
    .then(res => {
      CtrlMsg("postCtrlData", "result", decrypt(res.data));
      bind.setState({
        data: decrypt(res.data)
      });
    })
    .catch();
};

export const postCtrlEdit = row => {
  const data = { table: "_coloption", row: row };
  CtrlMsg("postCtrlEdit", "send", data);
  axios
    .post(database + "update", data)
    .then(res => {
      CtrlMsg("postCtrlEdit", "result", decrypt(res.data));
    })
    .catch();
};

import apiRequest from "../api/apiRequest";
import { CSVMsg } from "../models/log.model";
import { decrypt } from "../models/crypt.model";
import { CSVColumns, CSVColumnsList } from "../models/CSV.model";

export const postCSVColumns = bind => {
  let columns = [];
  CSVColumnsList.forEach(elm => {
    columns.push(CSVColumns(elm));
  });
  bind.setState({
    columns: columns
  });
};

export const postCSVData = bind => {
  CSVMsg("getCSVTableData", "send");
  apiRequest
    .get("/database/CSVList")
    .then(res => {
      CSVMsg("getCSVData", "result", decrypt(res.data));
      // 去除時間標記.000Z
      bind.setState({
        data: decrypt(res.data)[1].filter((x, i) => {
          const date_p = x.date_p.split("T");
          const date_m = x.date_m.split("T");
          x.date_p = date_p[0] + " " + date_p[1].split(".")[0];
          x.date_m = date_m[0] + " " + date_m[1].split(".")[0];
          return x;
        })
      });
    })
    .catch();
};

export const handleAllExport = props => {
  const isSelect = props.bind.node.selectionContext.state;
  props.bind.state.isSelect = isSelect.selected;
  isSelect.selected = [];
  props.bind.state.data.filter((x, i) => {
    isSelect.selected.push(x.ID);
    return false;
  });
  props.onExport();
  isSelect.selected = props.bind.state.isSelect;
};

export const handleSelectExport = props => {
  props.onExport();
};

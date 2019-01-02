import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";

export const postAnalysisTableData = bind => {
  axios
    .post(database + "AnalysisSum")
    .then(res => {
      const newData = decrypt(res.data);
      let dataList = [];
      for (let i = 0; i < newData.length; i++) {
        dataList[i] = newData[i][0]["COUNT(*)"];
      }
      bind.setState({ sum: dataList });
    })
    .catch();
};

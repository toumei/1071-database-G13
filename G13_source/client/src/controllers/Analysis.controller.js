import apiRequest from "../api/apiRequest";
import { decrypt } from "../models/crypt.model";

export const postAnalysisData = bind => {
  apiRequest
    .get("/database/AnalysisCount")
    .then(res => {
      const newData = decrypt(res.data);
      let dataList = [];
      for (let i = 0; i < newData.length; i++) {
        if (newData[i][0] === undefined) {
          dataList[i] = 0;
        } else {
          dataList[i] = newData[i][0]["COUNT(*)"];
        }
      }
      bind.setState({ count: dataList });
    })
    .catch();
};

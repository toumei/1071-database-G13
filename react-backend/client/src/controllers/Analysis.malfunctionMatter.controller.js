import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";

export const postAnalysisMalfunctionData = bind => {
  axios
    .post(database + "AnalysisMalfunction")
    .then(res => {
      const newData = decrypt(res.data);
      let matterLabel = [];
      let matterData = [];
      for (let i = 0; i < newData[0][0].value.length; i++) {
        matterLabel[i] = newData[0][0].value[i]["label"];
      }
      for (let i = 0; i < matterLabel.length; i++) {
        matterData[i] = 0;
        for (let j = 0; j < newData[1].length; j++) {
          if (matterLabel[i] === newData[1][j]["matter"]) {
            matterData[i] = newData[1][j]["COUNT(*)"];
            break;
          }
        }
      }
      bind.state.data.datasets[0].data = matterData;
      bind.state.data.labels = matterLabel;
    })
    .catch();
};

import apiRequest from "../api/apiRequest";
import { decrypt } from "../models/crypt.model";

export const postAnalysisMalfunctionData = bind => {
  apiRequest
    .get("/database/AnalysisMalfunction")
    .then(res => {
      const newData = decrypt(res.data);
      let matterLabel = [];
      let matterData = [];
      // 此處修改
      let count = 0;
      for (let i = 0; i < newData[0][0].value.length; i++) {
        matterLabel[i] = newData[0][0].value[i]["label"];
      }
      for (let i = 0; i < matterLabel.length; i++) {
        matterData[i] = 0;
        for (let j = 0; j < newData[1].length; j++) {
          if (matterLabel[i] === newData[1][j]["matter"]) {
            // 此處修改
            count = Math.max(count, newData[1][j]["COUNT(*)"]);
            matterData[i] = newData[1][j]["COUNT(*)"];
            break;
          }
        }
      }
      bind.state.data.datasets[0].data = matterData;
      bind.state.data.labels = matterLabel;
      // 此處修改
      bind.state.options.scale.ticks.stepSize = Math.pow(
        10,
        String(count).length - 1
      );
      bind.setState({
        data: bind.state.data,
        options: bind.state.options
      });
    })
    .catch();
};

import apiRequest from "../api/apiRequest";
import { decrypt } from "../models/crypt.model";

export const postAnalysisRepairData = bind => {
  apiRequest
    .get("/database/AnalysisRepair")
    .then(res => {
      const newData = decrypt(res.data);
      let malfunction = [];
      let processing = [];
      let repair = [];
      let tmpMonth = bind.Month + 1;
      let tmpPonit = 0;
      // 此處修改
      let count = 0;
      for (let i = 0; i < newData[0].length; i++) {
        tmpMonth = tmpMonth > newData[0][i]["month"] ? tmpMonth - 12 : tmpMonth;
        for (let j = tmpMonth; j < newData[0][i]["month"]; j++) {
          malfunction[tmpPonit] = 0;
          tmpPonit++;
        }
        // 此處修改
        count = Math.max(count, newData[0][i]["COUNT(*)"]);
        malfunction[tmpPonit] = newData[0][i]["COUNT(*)"];
        tmpMonth = parseInt(newData[0][i]["month"]) + 1;
        tmpPonit++;
      }
      tmpMonth = bind.Month + 1;
      tmpPonit = 0;
      for (let i = 0; i < newData[1].length; i++) {
        tmpMonth = tmpMonth > newData[1][i]["month"] ? tmpMonth - 12 : tmpMonth;
        for (let j = tmpMonth; j < newData[1][i]["month"]; j++) {
          processing[tmpPonit] = 0;
          tmpPonit++;
        }
        // 此處修改
        count = Math.max(count, newData[1][i]["COUNT(*)"]);
        processing[tmpPonit] = newData[1][i]["COUNT(*)"];
        tmpMonth = parseInt(newData[1][i]["month"]) + 1;
        tmpPonit++;
      }
      tmpMonth = bind.Month + 1;
      tmpPonit = 0;
      // 此處修改
      for (let i = 0; i < newData[2].length; i++) {
        tmpMonth = tmpMonth > newData[2][i]["month"] ? tmpMonth - 12 : tmpMonth;
        for (let j = tmpMonth; j < newData[2][i]["month"]; j++) {
          repair[tmpPonit] = 0;
          tmpPonit++;
        }
        // 此處修改
        repair[tmpPonit] = newData[2][i]["COUNT(*)"];
        tmpMonth = parseInt(newData[2][i]["month"]) + 1;
        tmpPonit++;
      }
      let max = Math.max(malfunction.length, processing.length);
      for (let i = malfunction.length; i < max; i++) {
        malfunction[i] = 0;
      }
      for (let i = processing.length; i < max; i++) {
        processing[i] = 0;
      }
      for (let i = repair.length; i < max; i++) {
        repair[i] = 0;
      }
      for (let i = 0; i < max; i++) {
        if (malfunction[i] === 0) {
          repair[i] = 0;
        } else {
          repair[i] = (repair[i] / malfunction[i]) * 100;
        }
      }
      bind.state.data.datasets[0].data = repair;
      bind.state.data.datasets[1].data = malfunction;
      bind.state.data.datasets[2].data = processing;
      // 此處修改
      bind.state.options.scales.yAxes[1].ticks.stepSize = Math.pow(
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

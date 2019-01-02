import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";

export function postAnalysisRepairData(bind) {
  axios
    .post(database + "AnalysisRepair")
    .then(res => {
      const newData = decrypt(res.data);
      let malfunction = [];
      let processing = [];
      let repair = [];
      let tmpMonth = bind.Month + 1;
      let tmpPonit = 0;
      for (let i = 0; i < newData[0].length; i++) {
        for (let j = tmpMonth; j < newData[0][i]["month"]; j++) {
          malfunction[tmpPonit] = 0;
          tmpPonit++;
        }
        malfunction[tmpPonit] = newData[0][i]["COUNT(*)"];
        tmpMonth = newData[0][i]["month"] + 1;
        tmpPonit++;
      }
      tmpMonth = bind.Month + 1;
      tmpPonit = 0;
      for (let i = 0; i < newData[1].length; i++) {
        for (let j = tmpMonth; j < newData[1][i]["month"]; j++) {
          processing[tmpPonit] = 0;
          tmpPonit++;
        }
        processing[tmpPonit] = newData[1][i]["COUNT(*)"];
        tmpMonth = newData[1][i]["month"] + 1;
        tmpPonit++;
      }
      tmpMonth = bind.Month + 1;
      tmpPonit = 0;
      for (let i = 0; i < newData[1].length; i++) {
        for (let j = tmpMonth; j < newData[1][i]["month"]; j++) {
          repair[tmpPonit] = 0;
          tmpPonit++;
        }
        repair[tmpPonit] = newData[1][i]["COUNT(*)"];
        tmpMonth = newData[1][i]["month"] + 1;
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
          repair[i] = repair[i] / malfunction[i];
        }
      }
      bind.state.data.datasets[0].data = repair;
      bind.state.data.datasets[1].data = malfunction;
      bind.state.data.datasets[2].data = processing;
    })
    .catch();
}

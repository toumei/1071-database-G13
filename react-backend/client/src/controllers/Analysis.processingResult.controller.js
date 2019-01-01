import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { url } from "../models/axios.model";

export function postAnalysisProcessingData(bind) {
  axios
    .post(url + "dbCtrl/AnalysisProcessing")
    .then(res => {
      const newData = decrypt(res.data);
      let processingLabel = [];
      let processingData = [];
      for (let i = 0; i < newData[0][0].value.length; i++) {
        processingLabel[i] = newData[0][0].value[i]["label"];
      }
      for (let i = 0; i < processingLabel.length; i++) {
        processingData[i] = 0;
        for (let j = 0; j < newData[1].length; j++) {
          if (processingLabel[i] === newData[1][j]["result"]) {
            processingData[i] = newData[1][j]["COUNT(*)"];
            break;
          }
        }
      }
      bind.state.data.datasets[0].data = processingData;
      bind.state.data.labels = processingLabel;
    })
    .catch();
}

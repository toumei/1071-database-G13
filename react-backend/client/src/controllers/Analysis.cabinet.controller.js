import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";

export const postAnalysisCabinetData = bind => {
  axios
    .post(database + "AnalysisCabinet")
    .then(res => {
      const newData = decrypt(res.data);
      const label = [0];
      const trueStatus = [];
      const falseStatus = [];
      for (let i = 0; i < newData[0].length; i++) {
        label[i + 1] = newData[0][i].cabinetCode;
        if (newData[0][i].status === "正常") {
          trueStatus.push({
            x: newData[0][i].cabinetCode,
            y: 0,
            r: 20
          });
        } else {
          falseStatus.push({
            x: newData[0][i].cabinetCode,
            y: 0,
            r: 20
          });
        }
      }
      for (let i = 0; i < newData[1].length; i++) {
        if (newData[1][i].status === "正常") {
          trueStatus.push({
            x: newData[1][i].cabinetCode,
            y: newData[1][i].switchID,
            r: 10
          });
        } else {
          falseStatus.push({
            x: newData[1][i].cabinetCode,
            y: newData[1][i].switchID,
            r: 15
          });
        }
      }
      bind.state.data.datasets[0].data = trueStatus;
      bind.state.data.datasets[1].data = falseStatus;
      bind.state.options.scales.xAxes[0].labels = label;
      bind.setState({ data: bind.state.data, options: bind.state.options });
    })
    .catch();
};

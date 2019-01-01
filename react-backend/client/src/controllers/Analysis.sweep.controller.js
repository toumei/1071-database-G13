import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { url } from "../models/axios.model";

export function postAnalysisSweepData(bind) {
  axios
    .post(url + "dbCtrl/AnalysisSweep")
    .then(res => {
      const newData = decrypt(res.data);
      console.log(newData);
    })
    .catch();
}

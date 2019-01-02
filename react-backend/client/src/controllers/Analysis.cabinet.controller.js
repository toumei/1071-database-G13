import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";

export function postAnalysisCabinetData(bind) {
  axios
    .post(database + "AnalysisCabinet")
    .then(res => {
      const newData = decrypt(res.data);
      console.log(newData);
    })
    .catch();
}

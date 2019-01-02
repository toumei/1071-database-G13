import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";

export const postAnalysisApplyData = bind => {
  axios
    .post(database + "AnalysisApply")
    .then(res => {
      const newData = decrypt(res.data);
      console.log(newData);
    })
    .catch();
};

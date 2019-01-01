import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { url } from "../models/axios.model";
import { CrudTableMenuData } from "../models/CRUD.TableMenu.model";

export function postCrudTableMenuData(bind) {
  axios
    .post(url + "dbCtrl/TableList")
    .then(res => {
      let data = [];
      decrypt(res.data).forEach(elm => {
        if (elm["TABLE_NAME"][0] !== "_") data.push(CrudTableMenuData(elm)[0]);
      });
      bind.setState({ data: data });
    })
    .catch();
}

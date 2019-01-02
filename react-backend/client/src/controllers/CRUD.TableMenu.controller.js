import axios from "axios";

// model
import { decrypt } from "../models/crypt.model";
import { database } from "../models/axios.model";
import { CrudTableMenuData } from "../models/CRUD.TableMenu.model";

export const postCrudTableMenuData = bind => {
  axios
    .post(database + "TableList")
    .then(res => {
      let data = [];
      decrypt(res.data).forEach(elm => {
        if (elm["TABLE_NAME"][0] !== "_") data.push(CrudTableMenuData(elm));
      });
      bind.setState({ data: data });
    })
    .catch();
};

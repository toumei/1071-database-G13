import apiRequest from "../api/apiRequest";

// model
import { decrypt, lowerJSONKey } from "../models/crypt.model";
import { CrudTableMenuData } from "../models/CRUD.TableMenu.model";

export const postCrudTableMenuData = bind => {
  apiRequest
    .get("/database/TableList")
    .then(res => {
      let data = [];
      decrypt(res.data).forEach(elm => {
        elm = lowerJSONKey(elm);
        if (elm["table_name"][0] !== "_") data.push(CrudTableMenuData(elm));
      });
      bind.setState({ data: data });
    })
    .catch();
};

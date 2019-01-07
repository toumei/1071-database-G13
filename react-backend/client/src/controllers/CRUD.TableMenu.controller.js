import apiRequest from "../api/apiRequest";

// model
import { decrypt } from "../models/crypt.model";
import { CrudTableMenuData } from "../models/CRUD.TableMenu.model";

export const postCrudTableMenuData = bind => {
  apiRequest
    .get("/database/" + "TableList")
    .then(res => {
      let data = [];
      decrypt(res.data).forEach(elm => {
        if (elm["TABLE_NAME"][0] !== "_") data.push(CrudTableMenuData(elm));
      });
      bind.setState({ data: data });
    })
    .catch();
};

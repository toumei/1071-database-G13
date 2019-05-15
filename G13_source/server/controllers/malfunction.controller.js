const cryptModel = require("../utils/crypt");
const db = require("../utils/mysql2");
/* READ *****************************/

module.exports = {
  getSearchID: (req, res) => {
    db.query("SELECT * FROM " + req.query.table + " where name = ?", [
      req.query.name
    ])
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  }
};

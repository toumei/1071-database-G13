const log = require("../utils/logger");
const cryptModel = require("../utils/crypt");
const db = require("../utils/mysql2");

/* READ *****************************/

module.exports = {
  getSearchNum: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    db.query(
      "SELECT ID FROM malfunction;\
    SELECT m.ID FROM malfunction m, processing p WHERE m.ID = p.malfunctionID;"
    )
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  }
};

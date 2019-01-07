const cryptModel = require("../models/crypt.model");
const db = require("../config/mysql2");

/* READ *****************************/

module.exports = {
  getSearchNum: (req, res) => {
    db.query(
      "SELECT ID FROM malfunction;\
    SELECT m.ID FROM malfunction m, processing p WHERE m.ID = p.malfunctionID;"
    )
      .then(([data]) => {
        console.log(data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  }
};

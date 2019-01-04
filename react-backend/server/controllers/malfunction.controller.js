const Malfuntion = require("../models/malfunction");

/* READ *****************************/

module.exports.getMalfuntion = (req, res, next) => {
  Malfuntion.fetchAll()
    .then(([rows]) => {
      for (let p of rows) {
        p.date = moment(p.date).format("MMM D, YYYY");
      }
      console.log(JSON.stringify(rows, ["id", "title", "date"]));
      //res.send(JSON.stringify(rows));
      res.render("malfunction", {
        data: rows,
        title: "Malfunction List"
      });
    })
    .catch(err => console.log(err));
};

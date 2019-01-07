var Sequelize = require("sequelize");
const db = require("../config/mysql");

// Model
var Coloption = db.define("_coloption", {
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  value: Sequelize.JSON
});

// Database synchronization
Coloption.sync({ force: false });

module.exports = Coloption;

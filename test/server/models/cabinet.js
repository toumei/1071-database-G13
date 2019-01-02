var Sequelize = require("sequelize");
const db = require("../config/mysql");

// Model
var Cabinet = db.define("cabinet", {
  status: Sequelize.BOOLEAN
});

// Database synchronization
Cabinet.sync({ force: false });

module.exports = Cabinet;

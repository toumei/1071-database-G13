var Sequelize = require("sequelize");
const db = require("../utils/mysql");

// Model
var Cabinet = db.define("cabinet", {
  cabinetCode: { type: Sequelize.INTEGER, unique: true },
  status: Sequelize.STRING
});

// Database synchronization
Cabinet.sync({ force: false });

module.exports = Cabinet;

var Sequelize = require("sequelize");
const db = require("../utils/mysql");

// Model
var Role = db.define("_role", {
  name: Sequelize.STRING
});

// Database synchronization
Role.sync({ force: false });

module.exports = Role;

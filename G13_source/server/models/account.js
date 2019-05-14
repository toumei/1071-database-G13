var Sequelize = require("sequelize");
const db = require("../utils/mysql");

// Model
var Account = db.define("_account", {
  password: Sequelize.STRING
});

// Database synchronization
Account.sync({ force: false });

module.exports = Account;

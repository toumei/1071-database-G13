var Sequelize = require("sequelize");
const db = require("../config/mysql");

// Model
var Vendor = db.define("vendor", {
  tel: Sequelize.STRING,
  email: Sequelize.STRING,
  addr: Sequelize.STRING
});

// Database synchronization
Vendor.sync({ force: false });

module.exports = Vendor;

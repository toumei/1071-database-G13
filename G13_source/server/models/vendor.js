var Sequelize = require("sequelize");
const db = require("../utils/mysql");

// Model
var Vendor = db.define("vendor", {
  vendorCode: { type: Sequelize.STRING, unique: true },
  name: Sequelize.STRING,
  tel: Sequelize.STRING,
  email: Sequelize.STRING,
  addr: Sequelize.STRING
});

// Database synchronization
Vendor.sync({ force: false });

module.exports = Vendor;

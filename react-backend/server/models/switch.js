var Sequelize = require("sequelize");
const db = require("../config/mysql");
const Account = require("./account");
const Cabinet = require("./cabinet");

// Model
var Switch = db.define("switch", {
  cabinetID: { type: Sequelize.INTEGER, unique: true },
  vendorCode: Sequelize.STRING,
  status: Sequelize.BOOLEAN,
  specification: Sequelize.STRING
});

// Database synchronization
Switch.sync({ force: false });
Switch.Cabinet = Switch.belongsTo(Cabinet, { foreignKey: "cabinetID" });

module.exports = Switch;

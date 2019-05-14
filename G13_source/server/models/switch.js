var Sequelize = require("sequelize");
const db = require("../utils/mysql");
const Account = require("./account");
const Cabinet = require("./cabinet");

// Model
var Switch = db.define("switch", {
  cabinetID: { type: Sequelize.INTEGER, unique: true },
  switchCode: Sequelize.INTEGER,
  status: Sequelize.STRING,
  specification: Sequelize.STRING
});

// Database synchronization
Switch.sync({ force: false });
Switch.Cabinet = Switch.belongsTo(Cabinet, { foreignKey: "cabinetID" });

module.exports = Switch;

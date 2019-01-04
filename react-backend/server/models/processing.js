var Sequelize = require("sequelize");
const db = require("../config/mysql");
const Account = require("./account");
const Malfunction = require("./malfunction");

// Model
var Processing = db.define("processing", {
  employeeID: { type: Sequelize.INTEGER, primaryKey: true },
  malfunctionID: { type: Sequelize.INTEGER, primaryKey: true },
  date: { type: Sequelize.DATE, primaryKey: true, defaultValue: Sequelize.NOW },
  result: Sequelize.STRING,
  detail: Sequelize.STRING
});

// Database synchronization
Processing.sync({ force: false });
Processing.Account = Processing.belongsTo(Account, {
  foreignKey: "employeeID"
});
Processing.Malfunction = Processing.belongsTo(Malfunction, {
  foreignKey: "malfunctionID"
});

module.exports = Processing;

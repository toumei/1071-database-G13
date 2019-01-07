var Sequelize = require("sequelize");
const db = require("../config/mysql");
const Employee = require("./employee");
const Malfunction = require("./malfunction");

// Model
var Processing = db.define("processing", {
  employeeID: { type: Sequelize.INTEGER, primaryKey: true },
  malfunctionID: { type: Sequelize.INTEGER, unique: true },
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  result: Sequelize.STRING,
  detail: Sequelize.STRING
});

// Database synchronization
Processing.sync({ force: false });
Processing.Employee = Processing.belongsTo(Employee, {
  foreignKey: "employeeID"
});
Processing.Malfunction = Processing.belongsTo(Malfunction, {
  foreignKey: "malfunctionID"
});

module.exports = Processing;

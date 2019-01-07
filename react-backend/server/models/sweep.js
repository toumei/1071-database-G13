var Sequelize = require("sequelize");
const db = require("../config/mysql");
const Employee = require("./employee");
const Cabinet = require("./cabinet");

// Model
var Sweep = db.define("sweep", {
  employeeID: { type: Sequelize.INTEGER, primaryKey: true },
  cabinetID: { type: Sequelize.INTEGER, primaryKey: true },
  date: { type: Sequelize.DATE, primaryKey: true, defaultValue: Sequelize.NOW }
});

// Database synchronization
Sweep.sync({ force: false });
Sweep.Employee = Sweep.belongsTo(Employee, {
  foreignKey: "employeeID"
});
Sweep.Cabinet = Sweep.belongsTo(Cabinet, { foreignKey: "cabinetID" });

module.exports = Sweep;

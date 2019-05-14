var Sequelize = require("sequelize");
const db = require("../utils/mysql");
const Employee = require("./employee");
const Switch = require("./switch");
const Vendor = require("./vendor");

// Model
var Apply = db.define("apply", {
  employeeID: { type: Sequelize.INTEGER },
  switchID: { type: Sequelize.INTEGER },
  vendorID: { type: Sequelize.INTEGER },
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  repair_date: { type: Sequelize.DATE },
  desc: Sequelize.STRING
});

// Database synchronization
Apply.sync({ force: false });
Apply.Account = Apply.belongsTo(Employee, {
  foreignKey: "employeeID"
});
Apply.Switch = Apply.belongsTo(Switch, { foreignKey: "switchID" });
Apply.Vendor = Apply.belongsTo(Vendor, { foreignKey: "vendorID" });

module.exports = Apply;

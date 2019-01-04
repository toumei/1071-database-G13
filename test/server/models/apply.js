var Sequelize = require("sequelize");
const db = require("../config/mysql");
const Account = require("./account");
const Switch = require("./switch");

// Model
var Apply = db.define("apply", {
  employeeID: { type: Sequelize.INTEGER, primaryKey: true },
  switchID: { type: Sequelize.INTEGER, primaryKey: true },
  date: { type: Sequelize.DATE, primaryKey: true, defaultValue: Sequelize.NOW },
  desc: Sequelize.STRING
});

// Database synchronization
Apply.sync({ force: false });
Apply.Account = Apply.belongsTo(Account, {
  foreignKey: "employeeID"
});
Apply.Switch = Apply.belongsTo(Switch, { foreignKey: "switchID" });

module.exports = Apply;

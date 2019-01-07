var Sequelize = require("sequelize");
const db = require("../config/mysql");

const Account = require("./account");
const Role = require("./role");

// Model
var Account_role = db.define("_account_role", {
  accountID: { type: Sequelize.INTEGER, primaryKey: true },
  roleID: { type: Sequelize.INTEGER, primaryKey: true }
});

// Database synchronization
Account_role.sync({ force: false });

Account_role.Account = Account_role.belongsTo(Account, {
  foreignKey: "accountID"
});
Account_role.Role = Account_role.belongsTo(Role, { foreignKey: "roleID" });

module.exports = Account_role;

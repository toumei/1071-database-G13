var Sequelize = require("sequelize");
const db = require("../config/mysql");
const Account = require("./account");

// Model
var Malfunction = db.define("malfunction", {
  studentID: { type: Sequelize.INTEGER, unique: true },
  bedNum: Sequelize.STRING,
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  matter: Sequelize.STRING,
  desc: Sequelize.STRING,
  time: Sequelize.STRING
});

// Database synchronization
Malfunction.sync({ force: false });
Malfunction.Boarder = Malfunction.belongsTo(Account, {
  foreignKey: "studentID"
});

module.exports = Malfunction;

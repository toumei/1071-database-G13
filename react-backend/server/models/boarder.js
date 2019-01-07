var Sequelize = require("sequelize");
const db = require("../config/mysql");
const Account = require("./account");

// Model
var Boarder = db.define("boarder", {
  studentCode: { type: Sequelize.INTEGER, primaryKey: true },
  name: Sequelize.STRING
});

// Database synchronization
Boarder.sync({ force: false });
Boarder.Account = Boarder.belongsTo(Account, { foreignKey: "studentCode" });

module.exports = Boarder;

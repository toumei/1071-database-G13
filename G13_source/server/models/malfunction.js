var Sequelize = require("sequelize");
const db = require("../utils/mysql");
const Boarder = require("./boarder");

// Model
var Malfunction = db.define("malfunction", {
  boarderID: { type: Sequelize.INTEGER },
  roomNum: Sequelize.STRING,
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  matter: Sequelize.STRING,
  desc: Sequelize.STRING
});

// Database synchronization
Malfunction.sync({ force: false });
Malfunction.Boarder = Malfunction.belongsTo(Boarder, {
  foreignKey: "boarderID"
});

module.exports = Malfunction;

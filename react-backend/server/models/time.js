var Sequelize = require("sequelize");
const db = require("../config/mysql");

const Malfunction = require("./malfunction");

// Model
var Time = db.define("time", {
  malfunctionID: { type: Sequelize.INTEGER },
  time: Sequelize.STRING,
  exc: Sequelize.STRING
});

// Database synchronization
Time.sync({ force: false });
Time.Malfunction = Time.belongsTo(Malfunction, {
  foreignKey: "malfunctionID"
});

module.exports = Time;

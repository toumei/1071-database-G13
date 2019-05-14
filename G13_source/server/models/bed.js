var Sequelize = require("sequelize");
const db = require("../utils/mysql");

const Malfunction = require("./malfunction");

// Model
var Bed = db.define("bed", {
  malfunctionID: Sequelize.INTEGER,
  bedNum: Sequelize.STRING
});

// Database synchronization
Bed.sync({ force: false });
Bed.Malfunction = Bed.belongsTo(Malfunction, { foreignKey: "malfunctionID" });

module.exports = Bed;

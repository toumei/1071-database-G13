var Sequelize = require("sequelize");
const db = require("../utils/mysql");

// Model
var Employee = db.define("employee", {
  name: Sequelize.STRING,
  IDcard: { type: Sequelize.STRING, unique: true }
});

// Database synchronization
Employee.sync({ force: false });

module.exports = Employee;

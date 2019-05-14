const Sequelize = require("sequelize");
var dbConfig = require("../config/database").mysqlSequelize;

module.exports = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  dbConfig.config
);

const Sequelize = require("sequelize");
var dbConfig = require("./database").mysql;

module.exports = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    pool: {
      max: dbConfig.connectionLimit,
      min: 0,
      idle: 30000
    },
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);

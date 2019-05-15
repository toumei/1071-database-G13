var mysql = require("mysql2");
var dbConfig = require("../config/database").mysql;
module.exports = mysql.createPool(dbConfig).promise();

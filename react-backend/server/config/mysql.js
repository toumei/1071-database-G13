var mysql = require('mysql2');
var dbConfig = require('./database').mysql;
module.exports = mysql.createPool(dbConfig).promise();

var mysql = require('mysql2');
var dbConfig = require('./database').mysql2;
module.exports = mysql.createPool(dbConfig).promise();

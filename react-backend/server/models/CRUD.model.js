var Sequelize = require("sequelize");
const db = require("../config/mysql");

module.exports = class {
  // CREATE
  static insert(table, sqlData) {
    return Sequelize.query("INSERT INTO " + table + " SET ?", {
      replacements: sqlData
    });
  }

  // READ
  static fetchTableAll() {
    return Sequelize.query(
      "SELECT table_name, table_comment FROM information_schema.tables WHERE table_schema = 'res_net_cmms'",
      { type: sequelize.QueryTypes.SELECT }
    );
  }

  static fetchColumnAll(table) {
    return Sequelize.query(
      "SELECT column_name, column_comment FROM information_schema.columns WHERE table_schema = 'res_net_cmms' AND table_name = ? ORDER BY ordinal_position",
      { replacements: [table], type: sequelize.QueryTypes.SELECT }
    );
  }

  static fetchDataAll(table) {
    return Sequelize.query("SELECT * FROM " + table);
  }

  static fetchDataById(table, id) {
    return Sequelize.query("SELECT * FROM " + table + " WHERE ID = ?", {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT
    });
  }

  // UPDATE
  static update(table, sqlData, id) {
    return Sequelize.query("UPDATE " + table + " SET ? WHERE ID = ?", {
      replacements: [id, sqlData, id]
    });
  }

  // DELETE
  static delete(table, id) {
    return Sequelize.query("DELETE FROM " + table + " WHERE ID = ?", {
      replacements: [id]
    });
  }
};

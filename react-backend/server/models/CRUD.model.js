const db = require("../config/mysql2");

module.exports = class {
  // CREATE
  static insert(table, sqlData) {
    return db.query("INSERT INTO " + table + " SET ?", sqlData);
  }

  // READ
  static fetchTableAll() {
    return db.query(
      "SELECT table_name, table_comment FROM information_schema.tables WHERE table_schema = 'res_net_cmms'"
    );
  }

  static fetchColumnAll(table) {
    return db.query(
      "SELECT column_name, column_comment FROM information_schema.columns WHERE table_schema = 'res_net_cmms' AND table_name = ?  ORDER BY ordinal_position",
      [table]
    );
  }

  static fetchDataAll(table) {
    return db.query("SELECT * FROM " + table);
  }

  static fetchDataById(table, id) {
    return db.query("SELECT * FROM " + table + " WHERE ID = ?", [id]);
  }

  // UPDATE
  static update(table, sqlData, id) {
    return db.query("UPDATE " + table + " SET ? WHERE ID = ?", [sqlData, id]);
  }

  // DELETE
  static delete(table, id) {
    return db.query("DELETE FROM " + table + " WHERE ID = ?", [id]);
  }
};

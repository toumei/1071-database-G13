const db = require("../config/mysql2");
const $sql = require("./mapper").dbCtrl;

module.exports = class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static insert(table, sqlData) {
    return db.query("INSERT INTO " + table + " SET ?", sqlData);
  }

  static update(table, sqlData, id) {
    return db.query("UPDATE " + table + $sql.update, [sqlData, id]);
  }

  static delete(table, id) {
    return db.execute("DELETE FROM " + table + $sql.delete, [id]);
  }

  static fetchAll(table) {
    return db.query($sql.fetchAll + table);
  }

  static fetchCtrlAll(table) {
    return db.query($sql.fetchCtrlAll, [table]);
  }

  static fetchColumnAll(table) {
    return db.query($sql.fetchColumnAll, [table]);
  }

  static fetchTableAll() {
    return db.query($sql.fetchTableAll);
  }

  static fetchCSVAll() {
    return db.query($sql.fetchCSVAll);
  }

  static fetchById(table, id) {
    return db.execute("SELECT * FROM " + table + " WHERE ID = ?", [id]);
  }

  static fetchByColumnId(table, search, id) {
    return db.execute("SELECT * FROM " + table + " WHERE " + search + " = ?", [
      id
    ]);
  }

  static fetchSum() {
    return db.query(
      "SELECT COUNT(*) FROM malfunction;SELECT COUNT(*) FROM processing;SELECT COUNT(*) FROM cabinet WHERE status != '正常';SELECT COUNT(*) FROM switch WHERE status != '正常';"
    );
  }
};

const db = require("../config/mysql2");
const $sql = require("./mapper").dbCtrl;

module.exports = class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static insert(sqlData) {
    return db.query($sql.insert, sqlData);
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
  static fetchColumnAll(table) {
    return db.query($sql.fetchColumnAll, [table]);
  }
  static fetchTableAll() {
    return db.query($sql.fetchTableAll);
  }
  static fetchById(id) {
    return db.execute($sql.fetchById, [id]);
  }
};

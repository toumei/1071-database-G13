const db = require("../config/mysql");
const $sql = require("./mapper").product;

module.exports = class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static describe() {
    return db.execute($sql.describe);
  }
  static insert(sqlData) {
    return db.query($sql.insert, sqlData);
  }
  static update(sqlData, id) {
    return db.query($sql.update, [sqlData, id]);
  }
  static delete(id) {
    return db.execute($sql.delete, [id]);
  }
  static fetchAll() {
    return db.execute($sql.fetchAll);
  }
  static fetchById(id) {
    return db.execute($sql.fetchById, [id]);
  }
};

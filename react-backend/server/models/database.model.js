const db = require("../config/mysql2");
const $sql = require("./mapper").database;

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
      "SELECT COUNT(*) FROM malfunction;\
      SELECT COUNT(*) FROM processing;\
      SELECT COUNT(*), matter FROM malfunction group by matter;\
      SELECT COUNT(*), result FROM processing group by result;\
      SELECT COUNT(*) FROM cabinet WHERE status != '正常';\
      SELECT COUNT(*) FROM switch WHERE status != '正常';\
      SELECT COUNT(*) FROM sweep WHERE date > '2018-12-23';\
      SELECT COUNT(*) FROM apply;"
    );
  }

  static fetchAnalysisRepair(day1, day2) {
    return db.query(
      "SELECT DATE_FORMAT(date, '%m') month, COUNT(*) FROM malfunction WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "' GROUP BY DATE_FORMAT(date, '%Y-%m') ORDER BY date ASC;\
        SELECT DATE_FORMAT(date, '%m') month, COUNT(*) FROM processing WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "' GROUP BY DATE_FORMAT(date, '%Y-%m') ORDER BY date ASC;\
        SELECT DATE_FORMAT(m.date, '%m') month, COUNT(*) FROM malfunction m, processing p WHERE m.malfunctionID = p.malfunctionID AND m.date > '" +
        day2 +
        "' AND m.date < '" +
        day1 +
        "' GROUP BY DATE_FORMAT(m.date, '%Y-%m') ORDER BY m.date ASC;"
    );
  }

  static fetchAnalysisMalfunction(day1, day2) {
    return db.query(
      "SELECT value FROM _coloption WHERE name = 'matter';\
      SELECT matter, COUNT(*) FROM malfunction WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "'  GROUP BY matter;"
    );
  }

  static fetchAnalysisProcessing(day1, day2) {
    return db.query(
      "SELECT value FROM _coloption WHERE name = 'result';\
      SELECT result, COUNT(*) FROM processing WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "'  GROUP BY result;"
    );
  }

  static fetchAnalysisCabinet(day1, day2) {
    return db.query(
      "SELECT value FROM _coloption WHERE name = 'result';\
      SELECT result, COUNT(*) FROM processing WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "'  GROUP BY result;"
    );
  }

  static fetchColumnsMsgAll(table) {
    return db.query($sql.fetchColumnsMsgAll, [table]);
  }
};

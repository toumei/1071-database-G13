const db = require("../config/mysql2");

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
    return db.query("UPDATE " + table + " SET ? WHERE ID = ?;", [sqlData, id]);
  }

  static delete(table, id) {
    return db.execute("DELETE FROM " + table + " WHERE ID = ?;", [id]);
  }

  static fetchAll(table) {
    return db.query("SELECT * FROM " + table);
  }
  static fetchColumnAll(table) {
    return db.query(
      "select i.column_name, i.column_comment, o.type, o.value from information_schema.columns i, _coloption o where i.table_schema = 'res_net_cmms' and i.table_name = ? and i.column_name = o.name order by i.ordinal_position;",
      [table]
    );
  }

  static fetchTableAll() {
    return db.query(
      "select table_name, table_comment from information_schema.tables where table_schema = 'res_net_cmms';"
    );
  }

  static fetchCSVAll() {
    return db.query(
      "SELECT p.ID ID, p.result, e.name name_e, p.date date_p, p.detail, m.date date_m, m.bedNum, b.name name_b, m.time, m.matter, m.desc FROM processing p, employee e, malfunction m, boarder b WHERE p.employeeID = e.ID and p.ID = m.ID and m.ID = b.studentID;"
    );
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
        SELECT DATE_FORMAT(m.date, '%m') month, COUNT(*) FROM malfunction m, processing p WHERE m.ID = p.ID AND m.date > '" +
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
    return db.query(
      "select column_name, column_comment from information_schema.columns where table_schema = 'res_net_cmms' and table_name = ?;",
      [table]
    );
  }
};

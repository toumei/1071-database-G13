const db = require("../config/mysql2");

module.exports = class Product {
  // create
  static insert(table, sqlData) {
    return db.query("INSERT INTO " + table + " SET ?", sqlData);
  }

  // read
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
      "SELECT p.malfunctionID ID, p.result, e.name name_e, p.date date_p, p.detail, m.date date_m, m.bedNum, b.name name_b, m.time, m.matter, m.desc FROM processing p, employee e, malfunction m, boarder b WHERE p.employeeID = e.ID and p.malfunctionID = m.ID and m.boarderID = b.studentCode;"
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

  static fetchCount(today) {
    return db.query(
      "SELECT COUNT(*) FROM malfunction WHERE date > '" +
        today +
        "';\
      SELECT COUNT(*) FROM processing WHERE date > '" +
        today +
        "';\
      SELECT COUNT(*) FROM (SELECT matter FROM malfunction WHERE date > '" +
        today +
        "' group by matter) m;\
      SELECT COUNT(*) FROM (SELECT result FROM processing WHERE date > '" +
        today +
        "' group by result) p;\
      SELECT COUNT(*) FROM cabinet WHERE status != '正常';\
      SELECT COUNT(*) FROM switch WHERE status != '正常';"
    );
  }

  static fetchAnalysisRepair(day1, day2) {
    return db.query(
      "SELECT DATE_FORMAT(date, '%m') month, COUNT(*) FROM malfunction WHERE date > '" +
        day2 +
        "' AND date <= '" +
        day1 +
        "' GROUP BY DATE_FORMAT(date, '%Y-%m') ORDER BY date ASC;\
        SELECT DATE_FORMAT(date, '%m') month, COUNT(*) FROM processing WHERE date > '" +
        day2 +
        "' AND date <= '" +
        day1 +
        "' GROUP BY DATE_FORMAT(date, '%Y-%m') ORDER BY date ASC;\
        SELECT DATE_FORMAT(m.date, '%m') month, COUNT(*) FROM malfunction m, processing p WHERE m.ID = p.malfunctionID AND m.date > '" +
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

  static fetchAnalysisCabinet() {
    return db.query(
      "SELECT * FROM cabinet;\
      SELECT c.cabinetCode, s.switchID, s.status FROM cabinet c, switch s WHERE c.ID = s.cabinetID;"
    );
  }

  static fetchColumnsMsgAll(table) {
    return db.query(
      "select column_name, column_comment from information_schema.columns where table_schema = 'res_net_cmms' and table_name = ?;",
      [table]
    );
  }

  // update
  static update(table, sqlData, id) {
    return db.query("UPDATE " + table + " SET ? WHERE ID = ?;", [sqlData, id]);
  }

  // delete
  static delete(table, id) {
    return db.execute("DELETE FROM " + table + " WHERE ID = ?;", [id]);
  }
};

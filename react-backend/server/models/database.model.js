const db = require("../config/mysql");
const db2 = require("../config/mysql2");
const Boarder = require("../models/boarder");
const Account = require("../models/account");
const Account_role = require("../models/account_role");
const Role = require("../models/role");
const Malfunction = require("../models/malfunction");
const Processing = require("../models/processing");
const Apply = require("../models/apply");
const Switch = require("../models/switch");
const Sweep = require("../models/sweep");
const Cabinet = require("../models/cabinet");
const Vendor = require("../models/vendor");
const Bed = require("../models/bed");
const Time = require("../models/time");
const Coloption = require("../models/coloption");

function UpperCase(str) {
  str = str[0].toUpperCase() + str.slice(1);
  return str;
}
module.exports = class Database {
  // create
  static insert(table, sqlData) {
    return eval(UpperCase(table)).create(sqlData);
  }

  // read
  static fetchAll(table) {
    return db.query("SELECT * FROM " + table);
  }

  static fetchColumnAll(table) {
    return db.query(
      "select i.column_name, i.column_comment, o.type, o.value from information_schema.columns i, _coloption o where i.table_schema = 'res_net_cmms' and i.table_name = :tableName and i.column_name = o.name order by i.ordinal_position;",
      { replacements: { tableName: table } }
    );
  }

  static fetchTableAll() {
    return db.query(
      "select table_name, table_comment from information_schema.tables where table_schema = 'res_net_cmms';"
    );
  }

  static fetchCSVAll() {
    return db2.query(
      "SELECT i.column_name FROM information_schema.columns i, _coloption o WHERE i.table_schema = 'res_net_cmms' AND i.column_name = o.name AND o.type = 'TEXTAREA' ORDER BY i.ordinal_position;\
    SELECT p.malfunctionID ID, p.result, e.name name_e, p.date date_p, p.detail, m.date date_m, m.roomNum, bed.bedNum, b.name name_b, t.time, t.exc, m.matter, m.desc FROM processing p, employee e, malfunction m, bed bed, boarder b, time t WHERE p.employeeID = e.ID and p.malfunctionID = m.ID and bed.malfunctionID = m.ID and m.boarderID = b.ID and t.malfunctionID = m.ID ORDER BY m.ID;"
    );
  }

  static fetchById(table, id) {
    return db.query("SELECT * FROM " + table + " WHERE ID = :id", {
      replacements: { id: id }
    });
  }

  static fetchByColumnId(table, search, id) {
    return db.query("SELECT * FROM " + table + " WHERE :search = :id", {
      replacements: { search: search, id: id }
    });
  }

  static fetchCount(today) {
    return db2.query(
      "SELECT COUNT(*) FROM malfunction WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "' ;\
      SELECT COUNT(*) FROM processing WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "';\
      SELECT COUNT(*) FROM (SELECT matter FROM malfunction WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "' group by matter) m;\
      SELECT COUNT(*) FROM (SELECT result FROM processing WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "' group by result) p;\
      SELECT COUNT(*) FROM cabinet WHERE status != '??';\
      SELECT COUNT(*) FROM switch WHERE status != '??';"
    );
  }

  static fetchAnalysisRepair(day1, day2) {
    return db2.query(
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
    return db2.query(
      "SELECT value FROM _coloption WHERE name = 'matter';\
      SELECT matter, COUNT(*) FROM malfunction WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "'  GROUP BY matter;"
    );
  }

  static fetchAnalysisProcessing(day1, day2) {
    return db2.query(
      "SELECT value FROM _coloption WHERE name = 'result';\
      SELECT result, COUNT(*) FROM processing WHERE date > '" +
        day2 +
        "' AND date < '" +
        day1 +
        "'  GROUP BY result;"
    );
  }

  static fetchAnalysisCabinet() {
    return db2.query(
      "SELECT * FROM cabinet;\
      SELECT c.cabinetCode, s.switchCode, s.status FROM cabinet c, switch s WHERE c.cabinetCode = s.cabinetID;"
    );
  }

  static fetchColumnsMsgAll(table) {
    return db.query(
      "select column_name, column_comment from information_schema.columns where table_schema = 'res_net_cmms' and table_name = :tableName;",
      {
        replacements: { tableName: table }
      }
    );
  }

  // update
  static update(table, sqlData, id) {
    return eval(UpperCase(table)).update(sqlData, { where: { ID: id } });
  }

  // delete
  static delete(table, id) {
    return eval(UpperCase(table)).destroy({ where: { ID: id } });
  }
};

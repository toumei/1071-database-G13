module.exports = {
  product: {
    describe: "DESCRIBE product;",
    insert: "INSERT INTO product SET ?;",
    update: "UPDATE product SET ? WHERE id = ?;",
    delete: "DELETE FROM product WHERE id = ?;",
    fetchById: "SELECT * FROM product WHERE id = ?;",
    fetchAll: "SELECT * FROM product;"
  },
  user: {
    describe: "DESCRIBE user;",
    insert: "INSERT INTO user SET ?;",
    update: "UPDATE user SET ? WHERE uid = ?;",
    delete: "DELETE FROM user WHERE uid = ?;",
    fetchByEmail: "SELECT * FROM user WHERE email = ?;",
    fetchById: "SELECT * FROM user WHERE uid = ?;",
    fetchAll: "SELECT * FROM user;"
  },
  database: {
    insert: "INSERT INTO product SET ?;",
    update: " SET ? WHERE ID = ?;",
    delete: " WHERE ID = ?;",
    fetchById: "SELECT * FROM product WHERE ID = ?;",
    fetchColumnAll:
      'select i.column_name, i.column_comment, o.type, o.value from information_schema.columns i, _coloption o where i.table_schema = "res_net_cmms" and i.table_name = ? and i.column_name = o.name order by i.ordinal_position;',
    fetchTableAll:
      'select table_name, table_comment from information_schema.tables where table_schema = "res_net_cmms";',
    fetchCSVAll:
      "SELECT p.malfunctionID ID, p.result, e.name name_e, p.date date_p, p.detail, m.date date_m, m.bedNum, b.name name_b, m.time, m.matter, m.desc FROM processing p, employee e, malfunction m, boarder b WHERE p.employeeID = e.employeeID and p.malfunctionID = m.malfunctionID and m.studentID = b.studentID;",
    fetchAll: "SELECT * FROM ",
    fetchColumnsMsgAll:
      'select column_name, column_comment from information_schema.columns where table_schema = "res_net_cmms" and table_name = ?;'
  }
};

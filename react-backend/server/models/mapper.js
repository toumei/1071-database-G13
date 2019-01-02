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
  }
};

const db = require('../config/mysql');
const $sql = require('./mapper').user;

module.exports = class User {
    constructor(uid, name, email, pwd) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.pwd = pwd;
    }

    static describe() { return db.execute($sql.describe); };
    static insert(sqlData) { return db.query($sql.insert, sqlData); };
    static update(sqlData, id) { return db.query($sql.update, [sqlData, id]); };
    static delete(id) { return db.execute($sql.delete, [id]); };
    static fetchAll() { return db.execute($sql.fetchAll); };
    static fetchByEmail(email) { return db.execute($sql.fetchByEmail, [email]); };
    static fetchById(id) { return db.execute($sql.fetchById, [id]); };
};

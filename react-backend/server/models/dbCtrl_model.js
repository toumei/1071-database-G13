const db = require('../config/mysql2');
const $sql = require('./mapper').dbCtrl;

module.exports = class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    static insert(sqlData) { return db.query($sql.insert, sqlData); };
    static update(sqlData, id) { return db.query($sql.update, [sqlData, id]); };
    static delete(id) { return db.execute($sql.delete, [id]); };
    static fetchAll() { return db.query($sql.fetchAll + $sql.fetchColumnAll); };
    static fetchById(id) { return db.execute($sql.fetchById, [id]); };
};

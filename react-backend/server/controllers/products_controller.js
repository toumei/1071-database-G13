const productsModel = require('../models/products_model');
var path = 'database/';
var router = '/products';
var table = 'Product';

module.exports = {
    getList: (req, res, next) => {
        var data = {
            colName: [],
            table: []
        };
        productsModel.describe()
            .then(([results]) => {
                data.colName = results;
                return productsModel.fetchAll();
            })
            .then(([results]) => {
                data.table = results;
                res.render(path + 'list', { title: table + ' List', router: router, table: table, data: data });
            })
            .catch(err => console.log(err));
    },

    getClientList: (req, res, next) => {
        productsModel.fetchAll()
            .then(([data]) => {
                res.send(data);
            })
            .catch(err => console.log(err));
    },

    getSearch: (req, res, next) => {
        var data = {
            colName: [],
            table: []
        };
        productsModel.describe()
            .then(([results]) => {
                data.colName = results;
                return productsModel.fetchById(req.query.id);
            })
            .then(([results]) => {
                data.table = results;
                res.render(path + 'search', { title: table + ' Search', router: router, table: table, data: data });
            })
            .catch(err => console.log(err));
    },

    getEdit: (req, res, next) => {
        var data = {
            colName: [],
            table: []
        };
        productsModel.describe()
            .then(([results]) => {
                data.colName = results;
                return productsModel.fetchById(req.query.id);
            })
            .then(([results]) => {
                data.table = results;
                res.render(path + 'edit', { title: table + ' Edit', router: router, table: table, data: data });
            })
            .catch(err => console.log(err));
    },

    postUpdate: (req, res, next) => {
        var sqlData = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        };

        productsModel.update(sqlData, req.body.id)
            .then(() => {
                res.redirect(router);
            })
            .catch(err => console.log(err));
    },

    getDelete: (req, res, next) => {
        productsModel.delete(req.query.id)
            .then(() => {
                res.redirect(router);
            })
            .catch(err => console.log(err));
    },

    getAdd: (req, res, next) => {
        var data = {
            colName: [],
            table: []
        };
        productsModel.describe()
            .then(([results]) => {
                data.colName = results;
                res.render(path + 'add', { title: 'Add ' + table, router: router, table: table, data: data });
            })
            .catch(err => console.log(err));

    },

    postAdd: (req, res, next) => {
        var sqlData = {
            name: req.body.name,
            price: req.body.price,
        };
        productsModel.insert(sqlData)
            .then(() => {
                res.redirect(router);
            })
            .catch(err => console.log(err));
    },
};

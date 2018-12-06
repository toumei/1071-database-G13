const productsModel = require('../models/products_model');
var path = 'database/productTable/';

module.exports = {
    getList: (req, res, next) => {
        productsModel.fetchAll()
        .then( ( [data] ) => {
            res.render(path + 'products', { title: 'Product List', data: data });
        })
        .catch( err => console.log(err));
    },
    
    getSearch: (req, res, next) => {
        productsModel.fetchById(req.query.id)
        .then( ( [data] ) => {
            res.render(path + 'productsSearch', { title: 'Product Search', data: data });
        })
        .catch( err => console.log(err));
    },

    getEdit: (req, res, next) => {
        productsModel.fetchById(req.query.id)
        .then( ( [data] ) => {
            res.render(path + 'productEdit', { title: 'Product Edit', data: data });
        })
        .catch( err => console.log(err));
    },

    postUpdate: (req, res, next) => {
        var sqlData = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        };
        productsModel.update(sqlData, req.body.id)
        .then( () => {
            res.redirect('/products');
        })
        .catch( err => console.log(err));
    },

    getDelete: (req, res, next) => {
        productsModel.delete(req.query.id)
        .then( () => {
            res.redirect('/products');
        })
        .catch( err => console.log(err));
    },

    getAdd: (req, res, next) => {
        res.render(path + 'productAdd', { title: 'Add Product', msg: '' });
    },
    
    postAdd: (req, res, next) => {
        var sqlData = {
            name: req.body.name,
            price: req.body.price,
        };
        productsModel.insert(sqlData)
        .then( () => {
            res.redirect('/products');
        })
        .catch( err => console.log(err));
    },
};
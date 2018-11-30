var mysql = require('mysql');
var dbConf = require('../config/DB');
var $sql = require('../mapper/CRUD').product;

var db  = mysql.createPool(dbConf.mysql);

module.exports = {
    list: function (req, res, next) {
        db.getConnection(function(err, connection) {
            if (err) throw err;

            connection.query($sql.queryAll, function(error, results, fields) {
                if (error) throw error;

                res.render('products', { title: 'Product List', data: results });
                connection.release();
    })})},

    edit: function (req, res, next) {
        db.getConnection(function(err, connection) {
            if (err) throw err;

            var id = req.query.id;
        
            connection.query($sql.queryById, id, function(error, results, fields) {
                if (error) throw error;

                res.render('productEdit', { title: 'Product Edit', data: results });
                connection.release();
    })})},

    update: function (req, res, next) {
        db.getConnection(function(err, connection) {
            if (err) throw err;

            var id = req.body.id;
            var data = {
                id: req.body.id,
                name: req.body.name,
                price: req.body.price
            };

            connection.query($sql.update, [data, id], function(error, results, fields) {
                if (error) throw error;

                res.redirect('/products');
                connection.release();
    })})},
    
    delete: function (req, res, next) {
        db.getConnection(function(err, connection) {
            if (err) throw err;

            var id = req.query.id;

            connection.query($sql.delete, id, function(error, results, fields) {
                if (error) throw error;

                res.redirect('/products');
                connection.release();
    })})},

    add: function (req, res, next) {
        db.getConnection(function(err, connection) {
            if (err) throw err;

            var data = {
                name: req.body.name,
                price: req.body.price
            };
            console.log(data);

            connection.query($sql.insert, data, function(error, results, fields) {
                if (error) throw error;

                res.redirect('/products');
                connection.release();
    })})}
};


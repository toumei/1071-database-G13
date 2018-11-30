var express = require('express');
var router = express.Router();
var productsDao = require('../dao/productsDao');
// show all products item
router.get('/', function(req, res, next) {
    productsDao.list(req, res, next);
});
// render product.Edit.ejs for prodcut edit 
router.get('/edit', function(req, res, next) {
    productsDao.edit(req, res, next);
});

// product edit to database from form of productEdit.ejs
router.post('/update', function(req, res, next) {
    productsDao.update(req, res, next);
});

// product delete for some id
router.get('/delete', function(req, res, next) {
    productsDao.delete(req, res, next);
});

// render productAdd.ejs for product add
router.get('/add', function(req, res, next) {
    // use userAdd.ejs
    res.render('productAdd', { title: 'Add Product', msg: '' });
});

// product add to database from productAdd.ejs
router.post('/add', function(req, res, next) {
    productsDao.add(req, res, next);
});
module.exports = router;

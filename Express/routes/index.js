var express = require('express');
var router = express.Router();
const productsModel = require('../models/products_model');

/* GET home page. */
router.get('/', function (req, res, next) {
    productsModel.fetchAll()
        .then(([data]) => {
            res.render('index', { title: '首頁', data: data });
        })
        .catch(err => console.log(err));
});

module.exports = router;

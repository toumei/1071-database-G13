var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('dbCtrl', { title: '資料庫' });
});

module.exports = router;
var express = require('express');
var router = express.Router();

router.get('/:yourid', function(req, res, next) {

    res.render('yourID', { id: req.params.yourid});
});
module.exports = router;

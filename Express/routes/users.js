var express = require('express');
var router = express.Router();
var passport = require("passport");
const usersController = require('../controllers/users_controller');

//passport.authenticate('JWT',{ session: false })

router.get('/', usersController.getList);
router.get('/search', usersController.getSearch);
router.get('/edit', usersController.getEdit);
router.post('/update', usersController.postUpdate);
router.get('/delete', usersController.getDelete);
router.get('/add', usersController.getAdd);
router.post('/add', usersController.postAdd);

module.exports = router;


var express = require("express");
var router = express.Router();

//set JWT
var passport = require("passport");
var jwt = require("jsonwebtoken");
var jwtConfig = require("../config/passport").JWT;

router.get("/", function(req, res, next) {
  res.render("login", { title: "Log In" });
});

router.post('/', passport.authenticate('login', { session: false }), function (req, res, next) {
    var token = jwt.sign(req.body, jwtConfig.secretOrKey, { expiresIn: '1h' });
    res.json({ "success": true, "token": 'Bearer ' + token });
});

module.exports = router;

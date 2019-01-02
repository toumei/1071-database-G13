var express = require("express");
var router = express.Router();

//set JWT
var passport = require("passport");
var jwt = require("jsonwebtoken");
var jwtConfig = require("../config/passport").JWT;

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Home" });
});

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  function(req, res, next) {
    var token = jwt.sign(req.body, jwtConfig.secretOrKey, { expiresIn: "1h" });
    res.json({ success: true, token: "Bearer " + token });
  }
);

router.post("/signup", passport.authenticate("signup", { session: false }));

module.exports = router;

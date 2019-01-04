var express = require("express");
var router = express.Router();

const malfuntioncontroller = require("../controllers/malfunction.controller");

router.get("/", function(req, res, next) {
  res.render("malfuntion", { title: "報修單" });
});

router.post("/", malfuntioncontroller.getMalfuntion);

module.exports = router;

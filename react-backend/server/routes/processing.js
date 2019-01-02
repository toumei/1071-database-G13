var express = require("express");
var router = express.Router();

const processingcontroller = require('../controllers/processing.controller');

router.get("/", function(req, res, next) {
    res.render("processing", { title: "維修單" });
  });

router.post('/', processingcontroller.getProcessing);

module.exports = router;
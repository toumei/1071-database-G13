var express = require("express");
var router = express.Router();

const processingcontroller = require("../controllers/processing.controller");

router.get("/searchNum", processingcontroller.getSearchNum);

module.exports = router;

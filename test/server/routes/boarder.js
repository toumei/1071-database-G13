var express = require("express");
var router = express.Router();

const boarderController = require("../controllers/boarder");

router.get("/list", boarderController.findAll);

module.exports = router;

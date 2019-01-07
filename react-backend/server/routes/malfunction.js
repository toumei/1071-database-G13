var express = require("express");
var router = express.Router();

const malfunctionController = require("../controllers/malfunction.controller");

router.get("/searchID", malfunctionController.getSearchID);

module.exports = router;

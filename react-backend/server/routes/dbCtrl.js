var express = require("express");
var router = express.Router();

const dbCtrlController = require("../controllers/dbCtrl_controller");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("dbCtrl", { title: "資料庫" });
});

router.get("/List", dbCtrlController.getList);
router.get("/TableList", dbCtrlController.getTableList);
router.get("/ColumnList", dbCtrlController.getColumnList);

module.exports = router;

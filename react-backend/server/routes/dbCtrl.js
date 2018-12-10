var express = require("express");
var router = express.Router();

const dbCtrlController = require("../controllers/dbCtrl.controller");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("dbCtrl", { title: "資料庫" });
});

router.post("/List", dbCtrlController.getList);
router.post("/TableList", dbCtrlController.getTableList);
router.post("/ColumnList", dbCtrlController.getColumnList);
router.post("/update", dbCtrlController.postUpdate);
router.post("/delete", dbCtrlController.postDelete);

module.exports = router;

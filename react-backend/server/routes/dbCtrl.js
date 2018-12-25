var express = require("express");
var router = express.Router();

const dbCtrlController = require("../controllers/dbCtrl.controller");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("dbCtrl", { title: "資料庫" });
});

router.post("/List", dbCtrlController.postList);
router.post("/TableList", dbCtrlController.postTableList);
router.post("/ColumnList", dbCtrlController.postColumnList);
router.post("/CtrlList", dbCtrlController.postCtrlList);
router.post("/update", dbCtrlController.postUpdate);
router.post("/delete", dbCtrlController.postDelete);
router.post("/add", dbCtrlController.postAdd);
router.post("/search", dbCtrlController.postSearch);
router.post("/searchColumnID", dbCtrlController.postSearchColumnID);

module.exports = router;

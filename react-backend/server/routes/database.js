var express = require("express");
var router = express.Router();

const dbCtrlController = require("../controllers/dbCtrl.controller");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("dbCtrl", { title: "資料庫" });
});

router.post("/List", dbCtrlController.postList);
router.post("/TableList", dbCtrlController.postTableList);
router.post("/CSVList", dbCtrlController.postCSVList);
router.post("/ColumnList", dbCtrlController.postColumnList);
router.post("/update", dbCtrlController.postUpdate);
router.post("/CtrlUpdate", dbCtrlController.postCtrlUpdate);
router.post("/delete", dbCtrlController.postDelete);
router.post("/add", dbCtrlController.postAdd);
router.post("/search", dbCtrlController.postSearch);
router.post("/searchColumnID", dbCtrlController.postSearchColumnID);
router.post("/AnalysisSum", dbCtrlController.postSum);
router.post("/AnalysisRepair", dbCtrlController.postAnalysisRepair);
router.post("/AnalysisMalfunction", dbCtrlController.postAnalysisMalfunction);
router.post("/AnalysisProcessing", dbCtrlController.postAnalysisProcessing);
router.post("/AnalysisCabinet", dbCtrlController.postAnalysisCabinet);
router.post("/ColumnsMsgList", dbCtrlController.postColumnsMsgList);

module.exports = router;

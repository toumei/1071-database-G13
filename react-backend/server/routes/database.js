const router = require("express").Router();

// controller
const dbCtrlController = require("../controllers/database.controller");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("dbCtrl", { title: "資料庫" });
});

// create
router.post("/add", dbCtrlController.postAdd);

// read
router.post("/List", dbCtrlController.postList);
router.post("/TableList", dbCtrlController.postTableList);
router.post("/CSVList", dbCtrlController.postCSVList);
router.post("/ColumnList", dbCtrlController.postColumnList);
router.post("/ColumnsMsgList", dbCtrlController.postColumnsMsgList);
router.post("/search", dbCtrlController.postSearch);
router.post("/searchColumnID", dbCtrlController.postSearchColumnID);
router.post("/AnalysisSum", dbCtrlController.postSum);
router.post("/AnalysisRepair", dbCtrlController.postAnalysisRepair);
router.post("/AnalysisMalfunction", dbCtrlController.postAnalysisMalfunction);
router.post("/AnalysisProcessing", dbCtrlController.postAnalysisProcessing);
router.post("/AnalysisCabinet", dbCtrlController.postAnalysisCabinet);

// update
router.post("/update", dbCtrlController.postUpdate);
router.post("/CtrlUpdate", dbCtrlController.postCtrlUpdate);

// delete
router.post("/delete", dbCtrlController.postDelete);

module.exports = router;

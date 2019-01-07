const router = require("express").Router();

// controller
const databaseController = require("../controllers/database.controller");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("dbCtrl", { title: "資料庫" });
});

// create
router.post("/add", databaseController.postAdd);

// read
router.get("/List", databaseController.getList);
router.get("/TableList", databaseController.getTableList);
router.get("/CSVList", databaseController.getCSVList);
router.get("/ColumnList", databaseController.getColumnList);
router.get("/ColumnsMsgList", databaseController.getColumnsMsgList);
router.get("/search", databaseController.getSearch);
router.get("/searchColumnID", databaseController.getSearchColumnID);
router.get("/AnalysisCount", databaseController.getCount);
router.get("/AnalysisRepair", databaseController.getAnalysisRepair);
router.get("/AnalysisMalfunction", databaseController.getAnalysisMalfunction);
router.get("/AnalysisProcessing", databaseController.getAnalysisProcessing);
router.get("/AnalysisCabinet", databaseController.getAnalysisCabinet);

// update
router.put("/update", databaseController.putUpdate);

// delete
router.delete("/delete", databaseController.delete);

module.exports = router;

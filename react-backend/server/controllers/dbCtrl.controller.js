const dbCtrlModel = require("../models/dbCtrl.model");
const cryptModel = require("../models/crypt.model");
var path = "database/productTable/";

module.exports = {
  postList: (req, res, next) => {
    dbCtrlModel
      .fetchAll(req.query.table)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postTableList: (req, res, next) => {
    dbCtrlModel
      .fetchTableAll()
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postCSVList: (req, res, next) => {
    dbCtrlModel
      .fetchCSVAll()
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postColumnList: (req, res, next) => {
    dbCtrlModel
      .fetchColumnAll(req.query.table)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postCtrlList: (req, res, next) => {
    dbCtrlModel
      .fetchCtrlAll(req.query.table)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postSearch: (req, res, next) => {
    dbCtrlModel
      .fetchById(req.body.table, req.body.id)
      .then(([data]) => {
        console.log(data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postSearchColumnID: (req, res, next) => {
    dbCtrlModel
      .fetchByColumnId(req.body.table, req.body.search, req.body.id)
      .then(([data]) => {
        console.log("data");
        console.log(data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postEdit: (req, res, next) => {
    dbCtrlModel
      .fetchById(req.query.id)
      .then(([data]) => {
        res.render(path + "productEdit", { title: "Product Edit", data: data });
      })
      .catch(err => console.log(err));
  },

  postUpdate: (req, res, next) => {
    dbCtrlModel
      .update(req.body.table, req.body.row, req.body.row.ID)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  },

  postCtrlUpdate: (req, res, next) => {
    if (req.body.row.type !== "SELECT") {
      req.body.row.value = JSON.stringify(req.body.row.value);
    }
    dbCtrlModel
      .update("_coloption", req.body.row, req.body.row.ID)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  },

  postDelete: (req, res, next) => {
    dbCtrlModel
      .delete(req.body.table, req.body.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  },

  postAdd: (req, res, next) => {
    dbCtrlModel
      .insert(req.body.table, req.body.row)
      .then(([data]) => {
        res.send({ id: data.insertId });
      })
      .catch(err => console.log(err));
  },

  postSum: (req, res, next) => {
    dbCtrlModel
      .fetchSum()
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postAnalysisRepair: (req, res, next) => {
    let Day1 = new Date();
    let Day2 = new Date(Day1);
    Day2.setMonth(Day2.getMonth() - 11);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    dbCtrlModel
      .fetchAnalysisRepair(day1, day2)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postAnalysisMalfunction: (req, res, next) => {
    let Day1 = new Date();
    let Day2 = new Date(Day1);
    Day2.setMonth(Day2.getMonth() - 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    dbCtrlModel
      .fetchAnalysisMalfunction(day1, day2)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postAnalysisProcessing: (req, res, next) => {
    let Day1 = new Date();
    let Day2 = new Date(Day1);
    Day2.setMonth(Day2.getMonth() - 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    dbCtrlModel
      .fetchAnalysisProcessing(day1, day2)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postAnalysisCabinet: (req, res, next) => {
    let Day1 = new Date();
    let Day2 = new Date(Day1);
    Day2.setMonth(Day2.getMonth() - 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    dbCtrlModel
      .fetchAnalysisCabinet(day1, day2)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  }
};

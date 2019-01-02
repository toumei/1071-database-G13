// model
const log = require("../models/log.model");
const cryptModel = require("../models/crypt.model");
const databaseModel = require("../models/database.model");

module.exports = {
  // create
  postAdd: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .insert(req.body.table, req.body.row)
      .then(([data]) => {
        log.msg(req, data);
        res.send({ id: data.insertId });
      })
      .catch(err => log.error(err));
  },

  // read
  postColumnsMsgList: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .fetchColumnsMsgAll(req.body.table)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postList: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .fetchAll(req.body.table)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postTableList: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .fetchTableAll()
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postCSVList: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .fetchCSVAll()
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postColumnList: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .fetchColumnAll(req.body.table)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postSearch: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .fetchAll(req.body.table)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postSearchColumnID: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .fetchByColumnId(req.body.table, req.body.search, req.body.id)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postSum: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .fetchSum()
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postAnalysisRepair: (req, res) => {
    log.msg(req, req.body);
    let Day1 = new Date();
    let Day2 = new Date(Day1);
    Day2.setMonth(Day2.getMonth() - 11);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    databaseModel
      .fetchAnalysisRepair(day1, day2)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postAnalysisMalfunction: (req, res) => {
    log.msg(req, req.body);
    let Day1 = new Date();
    let Day2 = new Date(Day1);
    Day2.setMonth(Day2.getMonth() - 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    databaseModel
      .fetchAnalysisMalfunction(day1, day2)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postAnalysisProcessing: (req, res) => {
    log.msg(req, req.body);
    let Day1 = new Date();
    let Day2 = new Date(Day1);
    Day2.setMonth(Day2.getMonth() - 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    databaseModel
      .fetchAnalysisProcessing(day1, day2)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postAnalysisCabinet: (req, res) => {
    log.msg(req, req.body);
    let Day1 = new Date();
    let Day2 = new Date(Day1);
    Day2.setMonth(Day2.getMonth() - 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    databaseModel
      .fetchAnalysisCabinet(day1, day2)
      .then(([data]) => {
        log.msg(req, data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  // update
  postUpdate: (req, res) => {
    log.msg(req, req.body);
    if (req.body.row.date !== undefined) {
      req.body.row.date = req.body.row.date.split(".")[0];
    }
    databaseModel
      .update(req.body.table, req.body.row, req.body.row.ID)
      .then(data => {
        log.msg(req, data);
      })
      .catch(err => log.error(err));
  },

  postCtrlUpdate: (req, res) => {
    if (req.body.row.type !== "SELECT") {
      req.body.row.value = JSON.stringify(req.body.row.value);
    }
    log.msg(req, req.body);
    databaseModel
      .fetchColumnAll(req.body.table)
      .then(([data]) => {
        log.msg(req, data);
        res.send({ id: data.insertId });
      })
      .catch(err => log.error(err));
  },

  // delete
  postDelete: (req, res) => {
    log.msg(req, req.body);
    databaseModel
      .delete(req.body.table, req.body.id)
      .then(data => {
        log.msg(req, data);
      })
      .catch(err => log.error(err));
  }
};

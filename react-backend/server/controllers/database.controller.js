// model
const log = require("../models/log.model");
const cryptModel = require("../models/crypt.model");
const databaseModel = require("../models/database.model");
const Today = new Date();
const today =
  Today.getFullYear() + "-" + ("0" + (Today.getMonth() + 1)).slice(-2);

module.exports = {
  // create
  postAdd: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .insert(req.body.table, req.body.row)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  // read
  postColumnsMsgList: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchColumnsMsgAll(req.body.table)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postList: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchAll(req.body.table)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postTableList: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchTableAll()
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postCSVList: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchCSVAll()
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postColumnList: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchColumnAll(req.body.table)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postSearch: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchAll(req.body.table)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postSearchColumnID: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchByColumnId(req.body.table, req.body.search, req.body.id)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postCount: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchCount(today)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postAnalysisRepair: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    const Day1 = new Date(Today);
    Day1.setMonth(Day1.getMonth() + 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    const Day2 = new Date(Today);
    Day2.setMonth(Day2.getMonth() - 11);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    databaseModel
      .fetchAnalysisRepair(day1, day2)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postAnalysisMalfunction: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    const Day1 = new Date(Today);
    Day1.setMonth(Day1.getMonth() + 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    const Day2 = new Date(Today);
    Day2.setMonth(Day2.getMonth() - 1);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    databaseModel
      .fetchAnalysisMalfunction(day1, day2)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postAnalysisProcessing: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    const Day1 = new Date(Today);
    Day1.setMonth(Day1.getMonth() + 1);
    day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
    const Day2 = new Date(Today);
    Day2.setMonth(Day2.getMonth() - 1);
    day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);
    databaseModel
      .fetchAnalysisProcessing(day1, day2)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  postAnalysisCabinet: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .fetchAnalysisCabinet()
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  // update
  postUpdate: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .update(req.body.table, req.body.row, req.body.row.ID)
      .then(data => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  // delete
  postDelete: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .delete(req.body.table, req.body.id)
      .then(data => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  }
};

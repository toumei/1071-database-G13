// model
const log = require("../utils/logger");
const cryptModel = require("../utils/crypt");
const databaseModel = require("../models/database.model");

const Today = new Date();
const Day1 = new Date(Today);
Day1.setMonth(Day1.getMonth() + 1);
day1 = Day1.getFullYear() + "-" + ("0" + (Day1.getMonth() + 1)).slice(-2);
const Day2 = new Date(Today);
Day2.setMonth(Day2.getMonth() - 11);
day2 = Day2.getFullYear() + "-" + ("0" + (Day2.getMonth() + 1)).slice(-2);

module.exports = {
  // create
  postAdd: (req, res) => {
    log.databaseMsg(req, "receive", req.body);
    databaseModel
      .insert(req.body.table, req.body.row)
      .then(() => {
        return databaseModel.fetchAll(req.body.table);
      })
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        console.log(req.body);
        console.log(data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  // read
  getColumnsMsgList: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchColumnsMsgAll(req.query.table)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getList: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchAll(req.query.table)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getTableList: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchTableAll()
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getCSVList: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchCSVAll()
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getColumnList: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchColumnAll(req.query.table)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getSearch: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchAll(req.query.table)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getSearchColumnID: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchByColumnId(req.query.table, req.query.search, req.query.id)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getCount: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchCount(day1, day2)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getAnalysisRepair: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchAnalysisRepair(day1, day2)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getAnalysisMalfunction: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchAnalysisMalfunction(day1, day2)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getAnalysisProcessing: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchAnalysisProcessing(day1, day2)
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  getAnalysisCabinet: (req, res) => {
    log.databaseMsg(req, "receive", req.query);
    databaseModel
      .fetchAnalysisCabinet()
      .then(([data]) => {
        log.databaseMsg(req, "send", data);
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => log.error(err));
  },

  // update
  putUpdate: (req, res) => {
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
  delete: (req, res) => {
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

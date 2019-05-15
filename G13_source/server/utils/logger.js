var log4js = require("log4js");
var logConfig = require("../config/log");

log4js.configure(logConfig);

var databaseLogger = log4js.getLogger("databaseDebug");
var cryptLogger = log4js.getLogger("cryptDebug");

module.exports = {
  error: err => {
    logger.error(err);
  },

  databaseMsg: (req, act, msg) => {
    databaseLogger.addContext("function", req.route.stack[0].name);
    databaseLogger.addContext("act", act);
    databaseLogger.debug(msg);
  },

  cryptMsg: (func, act, msg) => {
    cryptLogger.addContext("function", func);
    cryptLogger.addContext("act", act);
    cryptLogger.debug(msg);
  }
};

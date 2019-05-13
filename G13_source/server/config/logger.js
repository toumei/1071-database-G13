var log4js = require("log4js");
var path = require("path");
log4js.configure({
  appenders: {
    debug: {
      type: "file",
      filename: path.join(__dirname, "../log/debug.log"),
      layout: {
        type: "pattern",
        pattern: "%d [%p] %c%n function: %X{function}%n %X{act}%n  %m%n"
      }
    }
  },
  categories: { default: { appenders: ["debug"], level: "debug" } }
});

var logger = log4js.getLogger("debug");

module.exports = {
  error: err => {
    logger.error(err);
  },

  databaseMsg: (req, method, msg) => {
    logger.addContext("function", req.route.stack[0].name);
    logger.addContext("act", method);
    logger.debug(msg);
  }
};

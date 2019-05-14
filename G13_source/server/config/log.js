var path = require("path");

var logDirectory = path.join(__dirname, "../log");

module.exports = {
  appenders: {
    stdoutLogger: {
      type: "console"
    },
    databaseLogger: {
      type: "file",
      filename: path.join(logDirectory, "databaseDebug.log"),
      layout: {
        type: "pattern",
        pattern: "%d [%p] %c%n function: %X{function}%n %X{act}%n  %m%n"
      }
    },
    cryptLogger: {
      type: "file",
      filename: path.join(logDirectory, "cryptDebug.log"),
      layout: {
        type: "pattern",
        pattern: "%d [%p] %c%n function: %X{function}%n %X{act}%n  %m%n"
      }
    }
  },
  categories: {
    databaseDebug: { appenders: ["databaseLogger"], level: "debug" },
    cryptDebug: { appenders: ["cryptLogger"], level: "debug" },
    default: { appenders: ["stdoutLogger"], level: "debug" }
  }
};

const databaseLog = true;

module.exports = {
  error: err => {
    console.log(err);
  },

  databaseMsg: (req, method, msg) => {
    if (databaseLog) {
      console.log(req.route.stack[0].handle);
      console.log("Method: " + method);
      console.log(msg);
      console.log();
    }
  }
};

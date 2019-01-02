const databaseLog = true;

module.exports = {
  error: err => {
    console.log(err);
  },

  msg: (req, msg) => {
    if (databaseLog) {
      console.log(req.route.stack[0].handle);
      console.log(msg);
      console.log();
    }
  }
};

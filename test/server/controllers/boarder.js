const epilogue = require("epilogue");
const Boarder = require("../models/boarder");

module.exports = {
  findAll: (req, res, next) => {
    Boarder.findAll().then(boarders => {
      res.json(boarders);
    });
  }
};

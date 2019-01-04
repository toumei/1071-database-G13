const epilogue = require("epilogue");
const Boarder = require("../models/boarder");
const Account_role = require("../models/account_role");
const Account = require("../models/account");
const Role = require("../models/role");

module.exports = {
  findAll: (req, res, next) => {
    Account_role.findAll({
      include: [{ model: Account, include: [Boarder] }, Role]
    }).then(data => {
      res.json(data);
    });
  }
};

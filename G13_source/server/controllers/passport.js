const Account_role = require("../models/account_role");
const Account = require("../models/account");
const Role = require("../models/role");
const Boarder = require("../models/boarder");
var bcrypt = require("bcryptjs");

module.exports = {
  serializeUser: (user, done) => {
    done(null, user.id);
  },

  deserializeUser: (id, done) => {
    Account.findById(id)
      .then(data => {
        return done(null, data.dataValues);
      })
      .catch(err => console.log(err));
  },

  jwtStrategy: (jwt_payload, done) => {
    Account.count({ where: { id: jwt_payload.id } })
      .then(exist => {
        if (!exist) return done(null, false, { message: "Wrong JWT Token" });
        console.log(jwt_payload);
        return done(null, jwt_payload);
      })
      .catch(err => {
        return done(err);
      });
  },

  loginStrategy: (req, id, password, done) => {
    Account.findById(id)
      .then(data => {
        if (!data) return done(null, false, { message: "id is not exists" });
        if (!bcrypt.compareSync(password, data.dataValues.password))
          return done(null, false, { message: "Invalid Password" });

        return Account_role.findOne({
          where: { accountID: id },
          include: { model: Role, attributes: ["name"] }
        });
      })
      .then(data => {
        req.body["role"] = data._role.dataValues["name"];
        return done(null, data);
      })
      .catch(err => {
        return done(err);
      });
  },

  signupStrategy: (req, id, password, done) => {
    Account.count({ where: { id: id } })
      .then(exist => {
        if (exist) {
          return done(null, false, { message: "id Already Exists" });
        } else {
          Account_role.create({
            accountID: req.body.id,
            roleID: 4
          });
          Account.create({
            id: req.body.id,
            password: bcrypt.hashSync(req.body.password, 10)
          });
          Boarder.create({
            accountID: req.body.id,
            name: req.body.name
          });
        }
      })
      .then(() => {
        return done(null, "");
      })
      .catch(err => {
        return done(err);
      });
  }
};

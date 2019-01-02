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
      .then(([data]) => {
        return done(null, data[0]);
      })
      .catch(err => console.log(err));
  },

  jwtStrategy: (jwt_payload, done) => {
    Account.findById(jwt_payload.sub)
      .then(([data]) => {
        if (!data) return done(null, false, { message: "Wrong JWT Token" });
        return done(null, data[0]);
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
          include: { model: Role }
        });
      })
      .then(data => {
        console.log(data._role.dataValues);

        return done(null, { accountID: id, roles: data._role.dataValues });
      })
      .catch(err => {
        return done(err);
      });
  },

  signupStrategy: (req, id, password, done) => {
    Account.count({ where: { id: id } })
      .then(exist => {
        console.log(exist);
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

const usersModel = require("../models/users.model");
var bcrypt = require("bcryptjs");
var path = "database/";
var router = "/users";
var table = "User";

module.exports = {
  getList: (req, res, next) => {
    var data = {
      colName: [],
      table: []
    };
    usersModel
      .describe()
      .then(([results]) => {
        data.colName = results;
        return usersModel.fetchAll();
      })
      .then(([results]) => {
        data.table = results;
        res.render(path + "list", {
          title: table + " List",
          router: router,
          table: table,
          data: data
        });
      })
      .catch(err => console.log(err));
  },

  getSearch: (req, res, next) => {
    var data = {
      colName: [],
      table: []
    };
    usersModel
      .describe()
      .then(([results]) => {
        data.colName = results;
        return usersModel.fetchById(req.query.id);
      })
      .then(([results]) => {
        data.table = results;
        res.render(path + "search", {
          title: table + " Search",
          router: router,
          table: table,
          data: data
        });
      })
      .catch(err => console.log(err));
  },

  getEdit: (req, res, next) => {
    var data = {
      colName: [],
      table: []
    };
    usersModel
      .describe()
      .then(([results]) => {
        data.colName = results;
        return usersModel.fetchById(req.query.id);
      })
      .then(([results]) => {
        data.table = results;
        res.render(path + "edit", {
          title: table + " Edit",
          router: router,
          table: table,
          data: data
        });
      })
      .catch(err => console.log(err));
  },

  postUpdate: (req, res, next) => {
    var sqlData = {
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
      pwd: bcrypt.hashSync(req.body.pwd, 10)
    };
    usersModel
      .update(sqlData, req.body.uid)
      .then(() => {
        res.redirect(router);
      })
      .catch(err => console.log(err));
  },

  getDelete: (req, res, next) => {
    usersModel
      .delete(req.query.id)
      .then(() => {
        res.redirect(router);
      })
      .catch(err => console.log(err));
  },

  getAdd: (req, res, next) => {
    var data = {
      colName: [],
      table: []
    };
    usersModel
      .describe()
      .then(([results]) => {
        data.colName = results;
        res.render(path + "add", {
          title: "Add " + table,
          router: router,
          table: table,
          data: data
        });
      })
      .catch(err => console.log(err));
  },

  postAdd: (req, res, next) => {
    var sqlData = {
      name: req.body.name,
      email: req.body.email,
      pwd: bcrypt.hashSync(req.body.pwd, 10)
    };
    usersModel
      .insert(sqlData)
      .then(() => {
        res.redirect(router);
      })
      .catch(err => console.log(err));
  }
};

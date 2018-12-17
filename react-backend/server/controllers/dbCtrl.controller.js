const dbCtrlModel = require("../models/dbCtrl.model");
const cryptModel = require("../models/crypt.model");
var path = "database/productTable/";

module.exports = {
  postList: (req, res, next) => {
    dbCtrlModel
      .fetchAll(req.query.table)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postTableList: (req, res, next) => {
    dbCtrlModel
      .fetchTableAll()
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postColumnList: (req, res, next) => {
    dbCtrlModel
      .fetchColumnAll(req.query.table)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  postSearch: (req, res, next) => {
    dbCtrlModel
      .fetchById(req.query.id)
      .then(([data]) => {
        res.render(path + "products", { title: "Product Search", data: data });
      })
      .catch(err => console.log(err));
  },

  postEdit: (req, res, next) => {
    dbCtrlModel
      .fetchById(req.query.id)
      .then(([data]) => {
        res.render(path + "productEdit", { title: "Product Edit", data: data });
      })
      .catch(err => console.log(err));
  },

  postUpdate: (req, res, next) => {
    dbCtrlModel
      .update(req.body.table, req.body.data, req.body.data.ID)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  },

  postDelete: (req, res, next) => {
    dbCtrlModel
      .delete(req.body.table, req.body.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  },

  postAdd: (req, res, next) => {
    dbCtrlModel
      .insert(req.body.table, req.body.row)
      .then(() => {
        res.redirect("/products");
      })
      .catch(err => console.log(err));
  }
};

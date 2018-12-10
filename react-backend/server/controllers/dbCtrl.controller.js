const dbCtrlModel = require("../models/dbCtrl.model");
const cryptModel = require("../models/crypt.model");
var path = "database/productTable/";

module.exports = {
  getList: (req, res, next) => {
    dbCtrlModel
      .fetchAll(req.query.table)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  getTableList: (req, res, next) => {
    dbCtrlModel
      .fetchTableAll()
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  getColumnList: (req, res, next) => {
    dbCtrlModel
      .fetchColumnAll(req.query.table)
      .then(([data]) => {
        res.send(cryptModel.encrypt(data));
      })
      .catch(err => console.log(err));
  },

  getSearch: (req, res, next) => {
    dbCtrlModel
      .fetchById(req.query.id)
      .then(([data]) => {
        res.render(path + "products", { title: "Product Search", data: data });
      })
      .catch(err => console.log(err));
  },

  getEdit: (req, res, next) => {
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
    console.log(req.body);
    dbCtrlModel
      .delete(req.body.table, req.body.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  },

  getAdd: (req, res, next) => {
    res.render(path + "productAdd", { title: "Add Product", msg: "" });
  },

  postAdd: (req, res, next) => {
    var sqlData = {
      name: req.body.name,
      price: req.body.price
    };
    dbCtrlModel
      .insert(sqlData)
      .then(() => {
        res.redirect("/products");
      })
      .catch(err => console.log(err));
  }
};

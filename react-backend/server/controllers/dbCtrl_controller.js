const dbCtrlModel = require("../models/dbCtrl_model");
var path = "database/productTable/";

module.exports = {
  getList: (req, res, next) => {
    dbCtrlModel
      .fetchAll()
      .then(([data]) => {
        res.send(data);
      })
      .catch(err => console.log(err));
  },

  getTableList: (req, res, next) => {
    dbCtrlModel
      .fetchTableAll()
      .then(([data]) => {
        res.send(data);
      })
      .catch(err => console.log(err));
  },

  getColumnList: (req, res, next) => {
    dbCtrlModel
      .fetchColumnAll()
      .then(([data]) => {
        res.send(data);
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
    var sqlData = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price
    };

    dbCtrlModel
      .update(sqlData, req.body.id)
      .then(() => {
        res.redirect("/products");
      })
      .catch(err => console.log(err));
  },

  getDelete: (req, res, next) => {
    dbCtrlModel
      .delete(req.query.id)
      .then(() => {
        res.redirect("/products");
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

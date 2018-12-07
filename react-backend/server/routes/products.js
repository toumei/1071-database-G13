var express = require("express");
var router = express.Router();

const productsController = require("../controllers/products_controller");

router.get("/", productsController.getList);
router.get("/search", productsController.getSearch);
router.get("/edit", productsController.getEdit);
router.post("/update", productsController.postUpdate);
router.get("/delete", productsController.getDelete);
router.get("/add", productsController.getAdd);
router.post("/add", productsController.postAdd);
router.get("/client", productsController.getClientList);

module.exports = router;

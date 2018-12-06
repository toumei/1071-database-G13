var express = require('express');
var router = express.Router();

const productsController = require('../controllers/products_controller');

router.get('/', productsController.getList);
router.get('/search', productsController.getSearch);
router.get('/edit', productsController.getEdit);
router.post('/update', productsController.postUpdate);
router.get('/delete', productsController.getDelete);
router.get('/add', productsController.getAdd);
router.post('/add', productsController.postAdd);
router.get('/client', function (req, res, next) {
    res.send([
        {
            "id": "1",
            "name": "Book",
            "price": "18"
        },
        {
            "id": "2",
            "name": "Mobile",
            "price": "400"
        },
        {
            "id": "3",
            "name": "PC",
            "price": "1000"
        },
        {
            "id": "4",
            "name": "PS4",
            "price": "500"
        },
        {
            "id": "5",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "6",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "7",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "8",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "9",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "10",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "11",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "12",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "13",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "14",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "15",
            "name": "Chromebook",
            "price": "500"
        },
        {
            "id": "16",
            "name": "Chromebook",
            "price": "500"
        }
    ]);
});

module.exports = router;

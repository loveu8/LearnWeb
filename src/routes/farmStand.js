const express = require('express');
const farmStandController = require('../controllers/farmStandController');

const router = express.Router();

router.get('/add-categories', farmStandController.addCategories);

router.get('/products', farmStandController.products);

/* 注意因為路徑會類似 /product/:id，需要放在前面，後在後，會誤判*/
router.get('/product/new', farmStandController.newProduct);

router.post('/product/new', farmStandController.addNewProduct);

router.get('/product/:id', farmStandController.showProduct);
module.exports = router;
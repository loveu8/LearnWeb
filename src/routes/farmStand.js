const express = require('express');
const farmStandController = require('../controllers/farmStandController');

const router = express.Router();

router.get('/add-categories', farmStandController.addCategories);

router.get('/products', farmStandController.products);

router.get('/product/:id', farmStandController.showProduct);
module.exports = router;
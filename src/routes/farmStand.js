const express = require('express');
const farmStandController = require('../controllers/farmStandController');

const router = express.Router();

router.get('/add-categories', farmStandController.addCategories);

module.exports = router;
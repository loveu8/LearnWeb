const mongoose = require('mongoose');
const farmProductSchema = require('../models/farmProduct');

const localFarmStandUri = 'mongodb://127.0.0.1:27017/farmStand';

// 建立獨立連線，不與其他 controller 共用
const farmStandConnection = mongoose.createConnection(localFarmStandUri);

// 用這條獨立連線建 Model，資料只會存到 farmStand 這個 DB
const FarmProduct = farmStandConnection.model('farmProduct', farmProductSchema);

async function addCategories(req, res) {
    const taiwanFruits = [
        { name: 'Mango', price: 50, category: 'fruit' },
        { name: 'Pineapple', price: 45, category: 'fruit' },
        { name: 'Papaya', price: 30, category: 'fruit' },
        { name: 'Banana', price: 20, category: 'fruit' },
        { name: 'Grape', price: 80, category: 'fruit' },
        { name: 'Wax Apple', price: 60, category: 'fruit' },
        { name: 'Tomato', price: 25, category: 'vegetable' },
        { name: 'Cabbage', price: 35, category: 'vegetable' },
        { name: 'Milk', price: 40, category: 'dairy' },
        { name: 'Cheese', price: 120, category: 'dairy' }
    ];

    try {
        const result = await FarmProduct.insertMany(taiwanFruits);
        res.send(`✅ Successfully added ${result.length} products!`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function products(req, res) {
    try {
        const productsList = await FarmProduct.find({});
        console.log(productsList);
        res.render('farmProduct/index', { products: productsList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function showProduct(req, res) {
    try {
        const product = await FarmProduct.findById(req.params.id);
        console.log(product);
        res.render('farmProduct/show', { product: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addCategories,
    products,
    showProduct
};

const mongoose = require('mongoose');
const farmProductSchema = require('../models/farmProduct');

const localFarmStandUri = 'mongodb://127.0.0.1:27017/farmStand';

// 建立獨立連線，不與其他 controller 共用
const farmStandConnection = mongoose.createConnection(localFarmStandUri);

// 用這條獨立連線建 Model，資料只會存到 farmStand 這個 DB
const FarmProduct = farmStandConnection.model('farmProduct', farmProductSchema);

// 產品分類
const categories = ['fruit', 'vegetable', 'dairy', 'fungi'];

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
        const { category } = req.query;
        const productsList = category ? await FarmProduct.find({ category: category }) : await FarmProduct.find({});
        console.log(productsList);
        const isFilter = category ? true : false;
        let infoCategory = category ? category : 'All';
        res.render('farmProduct/index', { products: productsList, category: infoCategory, isFilter: isFilter });
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

async function newProduct(req, res) {
    try {
        res.render('farmProduct/new', { categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addNewProduct(req, res) {
    try {
        const newProduct = new FarmProduct(req.body);
        await newProduct.save();
        console.log(newProduct);
        res.redirect(`/farmStand/product/${newProduct._id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editProduct(req, res) {
    try {
        const product = await FarmProduct.findById(req.params.id);
        console.log(product);
        res.render('farmProduct/edit', { product, categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editProductAction(req, res) {
    try {
        const { id } = req.params;
        const product = await FarmProduct.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        console.log(res.product);
        res.redirect(`/farmStand/product/${product._id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await FarmProduct.findByIdAndDelete(req.params.id);
        console.log(product + ' -> deleted!!!');
        const productsList = await FarmProduct.find({});
        res.redirect('/farmStand/products');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addCategories,
    products,
    showProduct,
    editProduct,
    editProductAction,
    newProduct,
    addNewProduct,
    deleteProduct
};

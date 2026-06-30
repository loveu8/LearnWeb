const mongoose = require('mongoose');
const farmProductSchema = require('../models/farmProduct');

const localFarmStandUri = 'mongodb://127.0.0.1:27017/farmStand';

// 建立獨立連線，不與其他 controller 共用
const farmStandConnection = mongoose.createConnection(localFarmStandUri);

// 用這條獨立連線建 Model，資料只會存到 farmStand 這個 DB
const FarmProduct = farmStandConnection.model('farmProduct', farmProductSchema);

async function addCategories(req, res) {
    const farmProduct = new FarmProduct({
        name: 'Guva',
        price: 1,
        category: 'fruit'
    });

    await farmProduct.save();

    res.send('OK! farmProduct saved.');
}

module.exports = {
    addCategories
};

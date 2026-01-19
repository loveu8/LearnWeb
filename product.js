
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopA');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('CONNECTION OPEN!!');
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // this can set validation
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [
            0,
            'Price must be positive ya!!!'
        ] // you also can customize your error message
    },
    onSale: {
        type: Boolean,
        default: false
    },
    cateories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        isStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

const Product = mongoose.model('Product', productSchema);
// color red doesn't add into it. 
const bike = new Product({
    name: 'Cycing Jeresy',
    price: 10,
    cateories: ['A', 'B', 1], // although we pass 1 number , it will convert to string
    qty: {
        online: 10,
        store: 2
    },
    size: 'XS',
    color: 'red'
});


// bike.save()
//     .then(data => {
//         console.log("IT WORKED!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("ON NO!!!!");
//         console.error(err);
//     });

// Product.findOneAndUpdate(
//     { name: 'Tire Pump' },
//     { price: -10.99 },
//     { new: true })
//     .then(data => {
//         console.log("IT WORKED!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("ON NO!!!!");
//         console.error(err);
//     });
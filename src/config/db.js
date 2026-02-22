const mongoose = require('mongoose');

async function connectDB() {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.log('MONGO_URI not set, skipping MongoDB connection.');
        return;
    }

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('CONNECTION OPEN!!');
    });

    await mongoose.connect(mongoUri);
}

module.exports = connectDB;

const app = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();
    } catch (error) {
        console.error('DB connection failed:', error.message);
    }

    return app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

const server = startServer();

module.exports = server;
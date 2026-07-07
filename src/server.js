const app = require('./app');
const connectDB = require('./config/db');
const log = require('./utils/logger');

const port = process.env.PORT || 9999;

async function startServer() {
    log.info('Starting server...');

    try {
        log.info('Connecting to MongoDB...');
        await connectDB();
        log.info('MongoDB ready.');
    } catch (error) {
        log.error(`DB connection failed: ${error.message}`);
        log.warn('Continuing without DB.');
    }

    return new Promise((resolve, reject) => {
        const httpServer = app.listen(port, '127.0.0.1', () => {
            log.info(`Server started successfully on http://127.0.0.1:${port}`);
            log.info(`Health check: http://127.0.0.1:${port}/health`);
            resolve(httpServer);
        });

        httpServer.on('error', (err) => {
            log.error(`Server failed to start: ${err.message}`);
            reject(err);
        });
    });
}

startServer().catch((err) => {
    const log = require('./utils/logger');
    log.error(`Unhandled startup error: ${err.message}`);
    process.exit(1);
});
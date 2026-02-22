function requestLogger(req, res, next) {
    console.log(`Time:, ${Date.now()}. We got a RQ!. Path:${req.path}`);
    next();
}

module.exports = requestLogger;
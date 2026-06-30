const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');
const logFile = path.join(logDir, 'server.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

function formatLine(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
}

function writeToFile(line) {
    fs.appendFileSync(logFile, line + '\n', 'utf8');
}

function info(message) {
    const line = formatLine('INFO', message);
    console.log(line);
    writeToFile(line);
}

function error(message) {
    const line = formatLine('ERROR', message);
    console.error(line);
    writeToFile(line);
}

function warn(message) {
    const line = formatLine('WARN', message);
    console.warn(line);
    writeToFile(line);
}

module.exports = { info, error, warn };

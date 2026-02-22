const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../src/app');

test('GET /health returns ok', async () => {
    const server = app.listen(0);
    const address = server.address();

    try {
        const result = await new Promise((resolve, reject) => {
            const req = http.request(
                {
                    host: '127.0.0.1',
                    port: address.port,
                    path: '/health',
                    method: 'GET',
                },
                (res) => {
                    let body = '';
                    res.setEncoding('utf8');
                    res.on('data', (chunk) => {
                        body += chunk;
                    });
                    res.on('end', () => {
                        resolve({ statusCode: res.statusCode, body });
                    });
                }
            );

            req.on('error', reject);
            req.end();
        });

        assert.equal(result.statusCode, 200);
        assert.equal(result.body, 'ok');
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
});
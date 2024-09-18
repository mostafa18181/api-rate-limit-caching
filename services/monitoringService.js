const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({register});

const requestCounter = new client.Counter({
    name: 'api_request_count',
    help: 'Number of API requests',
    registers: [register]
});

const responseTime = new client.Histogram({
    name: 'api_response_time',
    help: 'Response time of API requests',
    registers: [register]
});

module.exports = {requestCounter, responseTime, register};

const Queue = require('bull');
const ConfigManager = require('./configManager');

const {host, port} = ConfigManager.getRedisSettings();

const requestQueue = new Queue('api-request-queue', {
    redis: {
        host,
        port
    }
});

requestQueue.process(async (job) => {
    console.log('Processing request:', job.data);
});

module.exports = requestQueue;

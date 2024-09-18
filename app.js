const express = require('express');
const ConfigManager = require('./services/configManager');
const limiter = require('./middlewares/rateLimiter');
const cacheMiddleware = require('./middlewares/cacheMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const {getData} = require('./controllers/dataController');
const {requestCounter, responseTime, register} = require('./services/monitoringService');
const authenticateJWT = require('./middlewares/authenticateJWT');

const app = express();

// Middleware for metrics collection
app.use((req, res, next) => {
    requestCounter.inc();
    const end = responseTime.startTimer();
    res.on('finish', () => {
        end();
    });
    next();
});

// Middleware to authenticate JWT tokens
app.use(authenticateJWT);

// Middleware to handle errors
app.use(errorHandler);

// Route to handle GET requests for /data with rate limiting and cache middleware
app.get('/data', limiter, cacheMiddleware, getData);

// Endpoint for Prometheus metrics
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

module.exports = app;

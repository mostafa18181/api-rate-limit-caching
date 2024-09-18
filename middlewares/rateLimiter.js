const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redisClient = require('../services/redisClient');
const ConfigManager = require('../services/configManager');

// Configure rate limiter with Redis as the store
const limiter = rateLimit({
    store: new RedisStore({
        client: redisClient,
        expiry: ConfigManager.getRedisSettings().ttl
    }),
    windowMs: ConfigManager.getRateLimiterSettings().windowMs,
    max: ConfigManager.getRateLimiterSettings().maxRequests,
    handler: (req, res) => {
        res.status(429).json({
            message: 'Too many requests, please try again later.'
        });
    }
});

module.exports = limiter;

const {getCache} = require('../services/cacheService');

const cacheMiddleware = (req, res, next) => {
    const cacheKey = req.url;

    getCache(cacheKey, (err, data) => {
        if (err || !data) {
            return next();
        }
        return res.json(data);
    });
};

module.exports = cacheMiddleware;

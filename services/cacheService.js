const redisClient = require('./redisClient');

const getCache = (key, callback) => {
    redisClient.get(key, (err, data) => {
        if (err || !data) {
            return callback(null, null);
        }
        return callback(null, JSON.parse(data));
    });
};

const setCache = (key, data, ttl = 60) => {
    redisClient.setex(key, ttl, JSON.stringify(data));
};

module.exports = {getCache, setCache};

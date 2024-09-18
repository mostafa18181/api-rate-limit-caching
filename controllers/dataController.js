const {setCache} = require('../services/cacheService');

const getData = (req, res) => {
    const mockData = {
        id: Math.floor(Math.random() * 100),
        name: 'ali',
        timestamp: Date.now(),
    };
    setCache(req.url, mockData);
    res.json(mockData);
};

module.exports = {getData};

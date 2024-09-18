const jwt = require('jsonwebtoken');
const cacheService = require('../services/cacheService');

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn((token, secretKey, callback) => {
        if (token.trim().localeCompare('valid_token') === 0) {
            callback(null, {userId: 'testUser'});
        } else if (token.trim().localeCompare('invalid_token') === 0) {
            callback(new Error('Access denied'));
        } else if (token.trim().localeCompare('expired_token') === 0) {
            callback(new Error('Token expired'));
        } else {
            callback(new Error('Unknown token'));
        }
    }),
}));

jest.mock('../services/cacheService', () => ({
    getCache: jest.fn((key, callback) => {
        if (key === '/data') {
            callback(null, {id: 1, name: 'ali'});
        } else {
            callback(null, null);
        }
    }),
    setCache: jest.fn(),
}));

module.exports = {jwt, cacheService};


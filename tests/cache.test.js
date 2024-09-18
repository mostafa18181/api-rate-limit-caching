const request = require('supertest');
const app = require('../app');
const cacheService = require('../services/cacheService');
const redis = require("../services/redisClient");
const {mockCacheService} = require('./mocks');

describe('Cache Middleware', () => {
    it('should return cached data if available', async () => {
        const res = await request(app).get('/data').set('Authorization', 'Bearer valid_token');

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('name', 'ali'); // داده‌های کش‌شده
    });

    it('should proceed to next middleware if no cached data is found', async () => {
        const res = await request(app).get('/data').set('Authorization', 'Bearer valid_token');

        expect(res.status).toEqual(200);
    });
    afterAll(async () => {
        await redis.disconnect();
        //    jest.resetModules();
// بستن اتصال Redis
    });
    beforeAll(async () => {
        await redis.flushdb();
    });
});


